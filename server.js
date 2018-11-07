import express from 'express';
import bodyParser from 'body-parser';

const server = express();
server.use(bodyParser.json());
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server is listening on port ${port}`));
