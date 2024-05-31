/* eslint-disable @typescript-eslint/no-explicit-any */
import { DbClientContract } from '@zenstackhq/runtime';
import type { Application, Handler, Request, Response } from 'express';
import { RPCApiHandler } from '../api/rpc';
import { loadAssets } from '../shared';
import { AdapterBaseOptions } from '../types';
import http, { IncomingMessage } from 'http';
import { WebSocket, WebSocketServer } from 'ws';
import { PrismaClient } from '@prisma/client';
import stream from 'node:stream';

/**
 * Express middleware options
 */
export interface MiddlewareOptions extends AdapterBaseOptions {
    /**
     * Callback for getting a PrismaClient for the given request
     */
    getPrisma: (req: Request, res: Response) => unknown | Promise<unknown>;

    /**
     * Controls if the middleware directly sends a response. If set to false,
     * the response is stored in the `res.locals` object and then the middleware
     * calls the `next()` function to pass the control to the next middleware.
     * Subsequent middleware or request handlers need to make sure to send
     * a response.
     *
     * Defaults to true;
     */
    sendResponse?: boolean;

    /**
     * enabling this would enable transaction support for the given app
     * This would install ws support on the app server
     */
    enableTransaction?: {
        app: Application;
        // todo: add custom server
    };
}

// return only the last value for duplicate headers
const handleDuplicateHeaders = (headers: Record<string, string | string[] | undefined>): Record<string, string> => {
    const result: Record<string, string> = {};
    Object.entries(headers).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            result[key] = value[value.length - 1];
        } else if (typeof value !== 'undefined') {
            result[key] = value;
        }
    });
    return result;
};

const wsHandleUpgradeAndWaitForConnectionClose = (
    wss: WebSocketServer,
    request: IncomingMessage,
    socket: stream.Duplex,
    head: Buffer,
    tx: PrismaClient,
) => {
    return new Promise<void>((resolve, reject) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            ws.on('message', async (message) => {
                try {
                    console.log('Received:', message.toString());
                    const data = JSON.parse(message.toString()) as
                        | {
                              path: string[];
                              args: any[];
                              error: string | null;
                          }
                        | undefined;
                    if (!data) {
                        console.log('Invalid data received');
                        ws.send('Invalid data received');
                        return reject('Invalid data received');
                    }
                    if (data.error) {
                        console.error('Client side Error occurred in transaction:', data.error);
                        ws.close();
                        return reject(data.error);
                        // throw new Error(data.error);
                    }
                    const { path, args } = data;
                    if (path && path.length == 2 && !path.find((p) => p.startsWith('$'))) {
                        const func = path.reduce((acc, curr) => (acc as any)[curr], tx);
                        const result = await func(...args);
                        ws.send(JSON.stringify(result));
                    } else {
                        console.log('Invalid path');
                        ws.send('Invalid path');
                        reject('Invalid path');
                    }
                } catch (err) {
                    console.error('Server side Error occurred in transaction', err);
                    ws.close();
                    reject(err);
                }
            });

            ws.on('close', () => {
                console.log('WebSocket connection closed');
                resolve();
            });

            ws.on('error', (err) => {
                console.error('WebSocket error:', err);
                reject(err);
            });
        });
    });
};
const patchAppWithWS = (app: Application, getPrisma: MiddlewareOptions['getPrisma']) => {
    const server = http.createServer(app);

    app.listen = function serverListen(...args) {
        return server.listen(...args);
    };
    const wss = new WebSocketServer({
        noServer: true,
    });

    server.on('upgrade', async (request, socket, head) => {
        console.log('upgrade event', request.url);
        if (request.url === '/model/transaction') {
            console.log('handling upgrade in /test-transaction');
            // create a dummy response to pass the request into express
            const response = new http.ServerResponse(request);
            // have Express process the request
            app(request, response);

            // get enhanced prisma client, to be used in the transaction
            const prisma = await getPrisma(request, response);

            prisma
                .$transaction(async (tx) => {
                    // console.log('inside a transaction');

                    // let 'ws' handle the upgrade, inside this transaction
                    // await to a close event so the transaction is not committed until the connection is closed
                    await wsHandleUpgradeAndWaitForConnectionClose(wss, request, socket, head, tx);
                })
                .catch((err) => {
                    console.error('Error occurred in transaction:', err, '\nRolling back transaction');
                });
        } else {
            socket.destroy();
        }
    });
};

/**
 * Creates an Express middleware for handling CRUD requests.
 */
const factory = (options: MiddlewareOptions): Handler => {
    const { modelMeta, zodSchemas } = loadAssets(options);

    const requestHandler = options.handler || RPCApiHandler();

    if (options.enableTransaction) {
        const { app } = options.enableTransaction;
        patchAppWithWS(app, options.getPrisma);
    }

    return async (request, response, next) => {
        const prisma = (await options.getPrisma(request, response)) as DbClientContract;
        const { sendResponse } = options;

        // Use the 'upgrade' event on the response object
        // response.on('upgrade', (clientSocket, head) => {
        //     console.log('upgrade event');
        //     // wss.handleUpgrade(request, clientSocket, head, (websocket) => {
        //     //     wss.emit('connection', websocket, request);
        //     //     websocket.on('message', (message) => {
        //     //         // Handle WebSocket message
        //     //         console.log('Received WebSocket message:', message);
        //     //         // Process the message
        //     //     });
        //     //     console.log('WebSocket connection established');
        //     //     // resolve({ status: 200, body: 'WebSocket connection established' });
        //     // });
        //
        //     // response.on('error', (e) => {
        //     //     console.log('error', e);
        //     // });
        // });

        if (sendResponse === false && !prisma) {
            throw new Error('unable to get prisma from request context');
        }

        if (!prisma) {
            return response.status(500).json({ message: 'unable to get prisma from request context' });
        }

        // express converts query parameters with square brackets into object
        // e.g.: filter[foo]=bar is parsed to { filter: { foo: 'bar' } }
        // we need to revert this behavior and reconstruct params from original URL
        const url = request.protocol + '://' + request.get('host') + request.originalUrl;
        const searchParams = new URL(url).searchParams;
        const query = Object.fromEntries(searchParams);

        try {
            const r = await requestHandler({
                method: request.method,
                path: request.path,
                query,
                requestBody: request.body,
                prisma,
                modelMeta,
                zodSchemas,
                logger: options.logger,
                request: request,
                response: response,
                headers: handleDuplicateHeaders(request.headers),
                socket: request.socket,
            });
            if (sendResponse === false) {
                // attach response and pass control to the next middleware
                response.locals = {
                    status: r.status,
                    body: r.body,
                };
                return next();
            }
            return response.status(r.status).json(r.body);
        } catch (err) {
            if (sendResponse === false) {
                throw err;
            }
            return response.status(500).json({ message: `An unhandled error occurred: ${err}` });
        }
    };
};

export default factory;

export { factory as ZenStackMiddleware };
