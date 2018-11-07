import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';

const server = express();
server.use(bodyParser.json());
const port = process.env.PORT || 3000;
server.use(routes);
server.listen(port, () => console.log(`server is listening on port ${port}`));

// export { server }