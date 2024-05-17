import logger from 'morgan';
import 'dotenv/config';
import { createRequire } from 'module';
import * as process from 'process';
import cookieSession from 'cookie-session';
import { getPrisma } from './getPrisma.js';
import { errorHandler } from './middleware/error.middleware.js';
import { cookieSessionFixMiddleware } from './middleware/cookieSessionFix.middleware.js';
import express, { Request, Response } from 'express';
import expressWS from 'express-ws';

import authRouter from './routes/auth.routes.js';

const require = createRequire(import.meta.url);
const { ZenStackMiddleware } = require('@zenstackhq/server/express');

if (!process.env.AUTH_SECRET) throw new Error('AUTH_SECRET env variable is required');

// Create Express server
export const app = express();
const wsApp = expressWS(app);

// Express configuration
app.set('port', process.env.PORT || 3000);

// Trust Proxy for Proxies (Heroku, Render.com, etc)
// https://stackoverflow.com/questions/40459511/in-express-js-req-protocol-is-not-picking-up-https-for-my-secure-link-it-alwa
app.enable('trust proxy');

app.use(logger('dev'));

// Parse incoming requests data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    cookieSession({
        name: 'session',
        keys: [process.env.AUTH_SECRET],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }),
);

app.use(cookieSessionFixMiddleware);

app.use('/auth', authRouter);

app.use(
    '/model',
    ZenStackMiddleware({
        getPrisma: getPrisma,
        zodSchemas: true,
    }),
);

app.get('/', async (req: Request, res: Response) => {
    res.send('backend up').status(200);
});

app!.ws('/test-transaction', function (ws, req) {
    console.log('this would run');
    ws.on('message', function (msg) {
        ws.send(msg);
    });
    // ws.close();
});

import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ noServer: true });
export const appServer = http.createServer(app);

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('Received:', message);
        ws.send('Message received: ' + message);
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });

    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
    });
});
// appServer.on('upgrade', (request, socket, head) => {
//     if (request.url === '/test-transaction') {
//         wss.handleUpgrade(request, socket, head, (ws) => {
//             wss.emit('connection', ws, request);
//         });
//     } else {
//         socket.destroy();
//     }
// });

// app.get('/test-transaction', async (req: Request, res: Response) => {
//     console.log('test-transaction');
//     const ws = new WebSocket('ws://localhost:8081');
//
//     ws.on('open', function open() {
//         console.log('sending');
//         ws.send('something');
//     });
// });

app.get('/error', (req, res) => {
    throw new Error('Error route');
});

// Error handlers
app.use(errorHandler);
