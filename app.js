/* eslint-disable no-console */
import express from 'express';
// import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes/routes';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

export default app;
