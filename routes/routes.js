/* eslint-disable no-console */
import express from 'express';
import authorizeUser from '../middlewares/authorizeUser';
import userHandler from '../controllers/userHandler';
import parcelHandler from '../controllers/parcelHandler';

const app = express.Router();
app.route('/api/v1/user/create')
  .post(authorizeUser, userHandler.createUser);

app.route('/api/v1/user/login')
  .post(userHandler.logUserIn);

app.route('/api/v1/parcels')
  .post(parcelHandler.createParcel)
  .get(parcelHandler.getAllParcels);

app.route('/api/v1/parcels/:parcelId')
  .get(parcelHandler.getParcelsById);

app.route('/api/v1/users/:userId/parcels')
  .get(parcelHandler.getUserParcels);

app.route('/api/v1/parcels/:parcelId/cancel')
  .put(parcelHandler.cancelParcel);

export default app;
