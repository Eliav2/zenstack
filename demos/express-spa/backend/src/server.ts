// Import app after environment variables are set
import { app } from './app';

const port = app.get('port') || 3000;

const server = app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

export default server;
