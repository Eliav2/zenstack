import { createFileRoute } from '@tanstack/react-router';
import { Box, Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '../components/Link.tsx';
import { PrismaClient } from 'prisma-models';
import { useFindManyUser, useFindUniqueUser } from 'zenstack-demo-warehouse-backend/src/hooks/generated';
import useAuthenticatedUser from '../hooks/useAuthenticatedUser.ts';

export const Route = createFileRoute('/')({
    component: HomeComponent,
});

interface TransactionProxy extends Omit<PrismaClient, `$${string}`> {
    // create: () => Promise<void>;
    // update: () => Promise<void>;
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

        function createTXProxy(path: string[] = []): any {
            return new Proxy(() => {}, {
                get: (target, prop) => {
                    if (typeof prop === 'string') {
                        return createTXProxy([...path, prop]);
                    }
                },
                apply: async (target, thisArg, args) => {
                    const data = { path, args };
                    const messageEvent = await sendAndAwaitResponse(socket, JSON.stringify(data));
                    const response = JSON.parse(messageEvent.data);
                    return response;
                },
            });
        }

        const txProxy = createTXProxy();
        socket.onopen = async (event) => {
            console.log('Connected to server', event['']);
            // socket._socket.write(Buffer.from([0xc1, 0x80]));
            await transactionHandler(txProxy);
            // await transactionHandler({
            //     create: async () => {
            //         const messageEvent = await sendAndAwaitResponse(socket, JSON.stringify({ test: 'Create' }));
            //         console.log('Create response:', messageEvent.data);
            //     },
            //     update: async () => {
            //         const messageEvent = await sendAndAwaitResponse(socket, 'Update');
            //         console.log('Update response:', messageEvent.data);
            //     },
            // });

            socket.close();
            console.log('closing!');
        };
    };
};

function HomeComponent() {
    const { user, handleSignIn, loading } = useAuthenticatedUser();

    const transaction = sendTransaction('ws://localhost:3000/model/transaction');
    const userQuery = useFindUniqueUser(
        {
            where: {
                email: user.email,
            },
        },
        {},
    );
    const userData = userQuery.data;
    const userMoney = userData?.money;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
            <Typography variant="body1">money: {userMoney}</Typography>
            <Button
                onClick={() => {
                    transaction(async (tx) => {
                        console.log('res1', await tx.product.findFirst());
                        console.log('res2', await tx.product.findFirst({ select: { name: true } }));
                        console.log('res3', await tx.product.findFirst({ select: { id: true, name: true } }));

                        // await tx.create();
                    });
                }}
            >
                Send
            </Button>
        </Box>
    );
}
