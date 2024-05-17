import { createFileRoute } from '@tanstack/react-router';
import { Box, Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '../components/Link.tsx';
import { useEffect, useRef, useState } from 'react';

export const Route = createFileRoute('/')({
    component: HomeComponent,
});

interface TransactionProxy {
    create: () => Promise<void>;
    update: () => Promise<void>;
}

function waitForResponse(socket: WebSocket): Promise<MessageEvent> {
    return new Promise((resolve) => {
        socket.onmessage = (event) => {
            resolve(event);
        };
    });
}

async function sendAndAwaitResponse(socket: WebSocket, message: string): Promise<MessageEvent> {
    // Send the message
    socket.send(message);
    // Wait for the response
    const response = await waitForResponse(socket);
    return response;
}

const sendTransaction = () => {
    // const [transactionState, setTransactionState] = useState<'IDLE' | 'CONNECTING' | 'SENDING' | 'WAITING'>('IDLE');
    // const socketRef = useRef<WebSocket | null>(null);
    // const transactionHandlerRef = useRef<((tx: TransactionProxy) => Promise<void>) | null>(null);

    // useEffect(() => {
    //     if (transactionState === 'CONNECTING') {
    //         let socket = new WebSocket('ws://localhost:3000/test-transaction');
    //         // Connection opened
    //         socket.addEventListener('open', function (event) {
    //             console.log('Connected to server');
    //             setTransactionState('SENDING');
    //             socketRef.current = socket;
    //         });
    //         // Connection closed
    //         socket.addEventListener('close', function (event) {
    //             console.log('Server connection closed: ', event.code);
    //         });
    //         // Connection error
    //         socket.addEventListener('error', function (event) {
    //             console.log('WebSocket error: ', event);
    //         });
    //         // Listen for messages
    //         socket.addEventListener('message', function (event) {
    //             console.log('Message from server: ', event.data);
    //         });
    //     } else if (transactionState === 'SENDING') {
    //         transactionHandlerRef
    //             .current?.({
    //                 create: async () => {
    //                     // socketRef.current?.send('Create');
    //                     const messageEvent = await sendAndAwaitResponse(socketRef.current, 'Create');
    //                     console.log('Create response:', messageEvent.data);
    //                 },
    //                 update: async () => {
    //                     // socketRef.current?.send('Update');
    //                     const messageEvent = await sendAndAwaitResponse(socketRef.current, 'Update');
    //                 },
    //             })
    //             ?.then(() => {
    //                 socketRef.current?.close();
    //                 console.log('closing!');
    //                 setTransactionState('IDLE');
    //                 socketRef.current = null;
    //                 transactionHandlerRef.current = null;
    //             });
    //     }
    // }, [transactionState]);

    return (transactionHandler: (tx: TransactionProxy) => Promise<void>) => {
        const socket = new WebSocket('ws://localhost:3000/test-transaction');
        socket.onopen = async (event) => {
            console.log('Connected to server');

            await transactionHandler({
                create: async () => {
                    const messageEvent = await sendAndAwaitResponse(socket, 'Create');
                    console.log('Create response:', messageEvent.data);
                },
                update: async () => {
                    const messageEvent = await sendAndAwaitResponse(socket, 'Update');
                    console.log('Update response:', messageEvent.data);
                },
            });
            socket.close();
            console.log('closing!');

            // resolve((transactionHandler) => {
            //     // transactionHandlerRef.current = transactionHandler;
            //     // socketRef.current?.send('Hello Server 123!');
            // });

            // // Send the message
            // socket.send(message);
            //
            // // Wait for the response
            // socket.onmessage = (event) => {
            //     resolve(event);
            // };
        };
    };
};

function HomeComponent() {
    const transaction = sendTransaction();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
            <Button
                onClick={() => {
                    transaction(async (tx) => {
                        await tx.create();
                        await tx.update();
                    });
                }}
            >
                Send
            </Button>
            <Typography variant="h2">Welcome To zenstack demo</Typography>
            <Divider />
            <Typography sx={{ fontSize: '1.3em', p: 3 }}>
                backend - zenstack+passport+github sso
                <br />
                frontend - react + mui5 + tanstack query + tanstack router - recoil
            </Typography>

            <Link to={'/products'} component={Box} sx={{ alignSelf: 'center' }}>
                <Button>Let's get started →</Button>
            </Link>
        </Box>
    );
}

// const sendTransaction = () => {
//     const [transactionState, setTransactionState] = useState<'IDLE' | 'CONNECTING' | 'SENDING' | 'WAITING'>('IDLE');
//     const socketRef = useRef<WebSocket | null>(null);
//     const transactionHandlerRef = useRef<((tx: TransactionProxy) => void) | null>(null);
//     const [ongoingTransactions, setOngoingTransactions] = useState<string[]>([]);
//     useEffect(() => {
//         if (transactionState === 'CONNECTING') {
//             let socket = new WebSocket('ws://localhost:3000/test-transaction');
//             // Connection opened
//             socket.addEventListener('open', function (event) {
//                 console.log('Connected to server');
//                 setTransactionState('SENDING');
//                 socketRef.current = socket;
//                 // socket.close();
//             });
//             // Connection closed
//             socket.addEventListener('close', function (event) {
//                 console.log('Server connection closed: ', event.code);
//             });
//             // Connection error
//             socket.addEventListener('error', function (event) {
//                 console.log('WebSocket error: ', event);
//             });
//             // Listen for messages
//             socket.addEventListener('message', function (event) {
//                 console.log('Message from server: ', event.data);
//             });
//         } else if (transactionState === 'SENDING') {
//             transactionHandlerRef.current?.({
//                 create: async () => {
//                     socketRef.current?.send('Create');
//                     setOngoingTransactions((prev) => [...prev, 'Create']);
//                 },
//                 update: async () => {
//                     socketRef.current?.send('Update');
//                     setOngoingTransactions((prev) => [...prev, 'Update']);
//                 },
//             });
//             setTransactionState('WAITING');
//         } else if (transactionState === 'WAITING') {
//             if (ongoingTransactions.length === 0) {
//                 socketRef.current?.close();
//                 setTransactionState('IDLE');
//                 socketRef.current = null;
//                 transactionHandlerRef.current = null;
//             }
//         }
//     }, [transactionState]);
//
//     return (transactionHandler: (tx: TransactionProxy) => Promise<void>) => {
//         // socketRef.current?.send('Hello Server 123!');
//
//         setTransactionState('CONNECTING');
//         transactionHandlerRef.current = transactionHandler;
//     };
// };
