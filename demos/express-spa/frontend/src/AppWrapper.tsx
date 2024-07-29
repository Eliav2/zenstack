import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Provider as ZenStackHooksProvider } from '@express-spa-demo/backend/src/generated-hooks';
import { AppStateProvider, useAppState } from './AppStateProvider.tsx';

const ZenStackHooksProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    const { currentUser } = useAppState();
    return (
        <ZenStackHooksProvider
            value={{
                endpoint: '/api/model',
                // custom fetch function that adds a custom header
                fetch: (url, options) => {
                    options = options ?? {};
                    options.headers = {
                        ...options.headers,
                        'x-user-username': currentUser,
                    };
                    return fetch(url, options);
                },
            }}
        >
            {children}
        </ZenStackHooksProvider>
    );
};

const queryClient = new QueryClient();
export default function AppWrapper({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AppStateProvider>
                <ZenStackHooksProviderWrapper>{children}</ZenStackHooksProviderWrapper>
            </AppStateProvider>
        </QueryClientProvider>
    );
}
