import { createFileRoute } from '@tanstack/react-router';
import { Box, Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '../components/Link.tsx';
import { PrismaClient } from 'prisma-models';
import { useFindManyUser, useFindUniqueUser, useUpdateUser } from 'zenstack-demo-warehouse-backend/src/hooks/generated';
import useAuthenticatedUser from '../hooks/useAuthenticatedUser.ts';
export const Route = createFileRoute('/')({
    component: HomeComponent,
});

interface TransactionProxy extends Omit<PrismaClient, `$${string}`> {}

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
                    if (typeof prop === 'string' && !prop.startsWith('$')) {
                        return createTXProxy([...path, prop]);
                    }
                },
                apply: async (target, thisArg, args) => {
                    const data = { path, args, error: null };
                    const messageEvent = await sendAndAwaitResponse(socket, JSON.stringify(data));
                    const response = JSON.parse(messageEvent.data);
                    console.log(path, args);

                    // todo: add here automatic query invalidation

                    const mutationOperation = [
                        'create',
                        'update',
                        'delete',
                        'upsert',
                        'deleteMany',
                        'updateMany',
                        'createMany',
                        'createManyAndReturn',
                    ];
                    const operation = path[1] as string;
                    if (mutationOperation.includes(operation)) {
                        console.log('mutation operation', operation, 'with args', args);
                        setupInvalidation(
                            model,
                            operation,
                            modelMeta,
                            finalOptions,
                            (predicate) => queryClient.invalidateQueries({ predicate }),
                            logging,
                        );
                    }

                    return response;
                },
            });
        }

        const txProxy = createTXProxy();
        socket.onopen = async (event) => {
            console.log('Connected to server');
            // socket._socket.write(Buffer.from([0xc1, 0x80]));
            try {
                await transactionHandler(txProxy);
            } catch (err) {
                const errStr = JSON.stringify({ error: err?.message ?? err });
                console.log('error occurred, rolling back transaction on the server', errStr);
                socket.send(errStr);
                // await sendAndAwaitResponse(socket, JSON.stringify({ error: true })
            }

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

    const userMutation = useUpdateUser({});
    if (!userMoney) {
        return null;
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
            <Typography variant="body1">money: {userMoney}</Typography>
            <Button
                onClick={() => {
                    transaction(async (tx) => {
                        const currentMoney = await tx.user.findFirst({
                            where: { email: user.email },
                            select: { money: true },
                        });
                        if (!currentMoney) {
                            throw new Error('User not found');
                        }
                        const res = await tx.user.update({
                            where: { email: user.email },
                            data: {
                                money: currentMoney.money + 10,
                            },
                        });
                        console.log(res);
                        // tx.user.createManyAndReturn()
                        // throw new Error('test client side erro1');

                        // console.log('res1', await tx.product.findFirst());
                        // console.log('res2', await tx.product.findFirst({ select: { name: true } }));
                        // console.log('res3', await tx.product.findFirst({ select: { id: true, name: true } }));

                        // await tx.create();
                    });
                }}
            >
                Send Transaction
            </Button>
            <Button
                onClick={() => {
                    userMutation.mutate({
                        where: { email: user.email },
                        data: {
                            money: userMoney + 10,
                        },
                    });
                }}
            >
                Send mutation query
            </Button>
        </Box>
    );
}
