regarding TRPC, i stopped using it and i don't want require the usage of a specific framework to enable certain feature,
and also, using trpc won't enable the 'magic' client side transactions as this issue is suggeting.

marking some progress here, taking express as the first target to implement this:

- i was able to add another option to zenstack middeware `enableTransaction` that expects the express `app`:
    ```ts
    app.use(
        '/model',
        ZenStackMiddleware({
            getPrisma: getPrisma,
            zodSchemas: true,
            enableTransaction: { 
                app,
                // server:  // optional, if not provided, it will use the app.listen server 
            },
        }),
    );
    
    ```
  this is necessary in order to enable websockets and transactions in this app. setting this option would patch this app
  server to use websockets on '/model/transaction' endpoint.
  
  it's also important to note that now we are using 'ws' package to handle websockets, so we will need to add 'ws' as a dependency to zenstack/server.
  another option is to extract the websocket handling to a separate package, and use it separately from `ZenstackMiddleware`.
- client side usage as follows:
  ```tsx
  function HomeComponent() {
    const transaction = sendTransaction('ws://localhost:3000/model/transaction');
    return (
            <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
              <Button
                      onClick={() => {
                        transaction(async (tx) => {
                          // imagine this as prisma operations such as tx.user.create({...}) and so on.
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
  ```
  this is the basic usage of the client side transaction, it's not yet tested, but it should work.
  `sendTransaction` should ideally be imported from zenstack, but currently, its unclear from what package.
  even if we extract the websocket handling to a separate package, we will then need to install it both on the client and the server.
  another option is to generate `sendTransaction` function on `zenstack generate` command, so it would be dependency in backend but the frontend could just import the generated hook without adding a dependency.
- results: