/* eslint-disable no-console */
import express from 'express';
import morgan from 'morgan';
import DB from './models/index';
import routes from './routes/routes';


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
DB.startUpDB();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the send-IT service.',
  });
});

app.use(routes);

export default app;
