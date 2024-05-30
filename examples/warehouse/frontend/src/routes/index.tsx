import { createFileRoute } from '@tanstack/react-router';
import { Box, Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '../components/Link.tsx';

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

const sendTransaction = (url: string) => {
    return (transactionHandler: (tx: TransactionProxy) => Promise<void>) => {
        const socket = new WebSocket(url);
        socket.onopen = async (event) => {
            console.log('Connected to server');
            // socket._socket.write(Buffer.from([0xc1, 0x80]));
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
        };
    };
};

function HomeComponent() {
    const transaction = sendTransaction('ws://localhost:3000/model/transaction');
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
            </Button>{' '}
        </Box>
    );
}
