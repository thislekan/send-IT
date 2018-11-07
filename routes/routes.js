import express from 'express';
import authenticate from '../controllers/authenticate';

const app = express.Router();

app.route('/parcel')
    .get(authenticate);

// app.get('/parcel', authenticate);

export { app as default }