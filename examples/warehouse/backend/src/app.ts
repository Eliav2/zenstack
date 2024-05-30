import logger from 'morgan';
import 'dotenv/config';
import * as process from 'process';
import cookieSession from 'cookie-session';
import { getPrisma } from './getPrisma.js';
import { errorHandler } from './middleware/error.middleware.js';
import { cookieSessionFixMiddleware } from './middleware/cookieSessionFix.middleware.js';
import express, { Request, Response } from 'express';
import expressWS from 'express-ws';

import authRouter from './routes/auth.routes.js';
import { ZenStackMiddleware } from '@zenstackhq/server/express';

if (!process.env.AUTH_SECRET) throw new Error('AUTH_SECRET env variable is required');

// Create Express server
export const app = express();

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
        enableTransaction: { app },
    }),
);

app.get('/', async (req: Request, res: Response) => {
    res.send('backend up').status(200);
});

// const patchAppWithWS = (app: express.Application) => {
//     const server = http.createServer(app);
//
//     app.listen = function serverListen(...args) {
//         return server.listen(...args);
//     };
//     const wss = new WebSocketServer({
//         // server: server
//         noServer: true,
//     });
//     // export const appServer = http.createServer(app);
//
//     wss.on('connection', (ws) => {
//         ws.on('message', (message) => {
//             console.log('Received:', message);
//             ws.send('Message received: ' + message);
//         });
//
//         ws.on('close', () => {
//             console.log('WebSocket connection closed');
//         });
//
//         ws.on('error', (err) => {
//             console.error('WebSocket error:', err);
//         });
//     });
//     server.on('upgrade', (request, socket, head) => {
//         console.log('upgrade event', request.url);
//         if (request.url === '/test-transaction') {
//             console.log('handling upgrade in /test-transaction');
//             wss.handleUpgrade(request, socket, head, (ws) => {
//                 wss.emit('connection', ws, request);
//             });
//         } else {
//             socket.destroy();
//         }
//     });
// };
// patchAppWithWS(app);

// server.on('upgrade', function upgrade(request, socket, head) {
//     // console.log('head', head);
//     // console.log('asdasdasds');
//     // wss.handleUpgrade(request, socket, head, function done(ws) {
//     //     wss.emit('connection', ws, request);
//     // });
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
