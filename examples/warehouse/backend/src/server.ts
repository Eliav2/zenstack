import './globals.js';
import * as dotenv from 'dotenv';
// import { appServer } from './app.js';
// Load environment variables
dotenv.config({ path: __dirname + '/../.env' });

// Import app after environment variables are set
const { app } = await import('./app.js');

const port = app.get('port');

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
// appServer.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });
export default server;
