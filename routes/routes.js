/* eslint-disable no-console */
import express from 'express';
// import authenticate from '../controllers/authenticate';
import userHandler from '../controllers/userHandler';
import parcelHandler from '../controllers/parcelHandler';

const app = express.Router();

// app.route('/parcel')
//   .get(authenticate);

app.route('/create-user')
  .post(userHandler.confirmUser, userHandler.createUser);

app.route('/login')
  .post(userHandler.logUserIn);

app.route('/parcels')
  .post(parcelHandler.createParcel);

app.route('/parcels')
  .get(parcelHandler.getAllParcels);

app.route('/parcels/:id')
  .get(parcelHandler.getParcelsById);

app.route('/users/:userid/parcels')
  .get(parcelHandler.getUserParcels);

export { app as default };
