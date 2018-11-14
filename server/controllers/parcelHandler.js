/* eslint-disable no-console */
import store from '../db/store';
import idGenerator from '../middlewares/ID_Generator';

class Order {
  constructor(orderID, pickup, destination, userid) {
    this.id = orderID;
    this.pickup = pickup;
    this.destination = destination;
    this.user = userid;
  }
}

export default {
  createParcel: (req, res) => {
    const { body, headers } = req;
    const { userid } = headers;
    const { pickup, destination } = body;
    const parcelID = idGenerator();
    const newOrder = new Order(parcelID, pickup, destination, userid);

    if (!store.users.length) {
      return res.status(401).send({
        error: 'User not authorized to create parcel. Please sign up.',
      });
    }

    const foundUser = store.users.find(element => element.id === userid);
    if (!foundUser) {
      return res.status(400).send({ error: 'User does not exist.' });
    }
    foundUser.orders.unshift(newOrder);
    store.parcels.unshift(newOrder);

    return res.status(201).send(newOrder);
  },
  getAllParcels: (req, res) => {
    if (!store.parcels.length) {
      return res.status(404).send({ error: 'No parcel record found.' });
    }
    const allParcels = store.parcels;
    return res.status(200).send(allParcels);
  },
  getParcelsById: (req, res) => {
    const query = req.params.parcelId;

    if (!store.parcels.length) {
      return res.status(404).send({ error: 'No parcel record exist in Database' });
    }
    const foundParcel = store.parcels.find(element => element.id === query);
    if (!foundParcel) {
      return res.status(404).send({ error: `Parcel with ID: ${query} not found` });
    }
    return res.status(200).send(foundParcel);
  },
  getUserParcels: (req, res) => {
    const query = req.params.userId;

    if (!store.users.length) {
      return res.status(404).send({ error: 'No parcel record exist on the Database yet.' });
    }

    const foundUser = store.users.find(element => element.id === query);
    if (!foundUser) {
      return res.status(404).send({ error: 'No parcel record for the user exist' });
    }

    return res.status(200).send(foundUser.orders);
  },
  cancelParcel: (req, res) => {
    const { parcelId } = req.params;
    const { userid } = req.headers;

    if (!store.parcels.length) {
      return res.status(404).send({ error: 'No parcel record exist on the Database yet.' });
    }

    const foundParcel = store.parcels.find(element => element.id === parcelId);
    const foundUser = store.users.find(element => element.id === userid);

    if (!foundParcel) {
      return res.status(404).send({ error: `No parcel with ID: ${parcelId} was found` });
    }

    if (foundParcel.user !== userid) {
      return res.status(401).send({ error: 'You are not authorized to change this parcel' });
    }
    const indexOfParcelForUser = foundUser.orders.indexOf(foundParcel);
    const indexOfParcelForParcels = store.parcels.indexOf(foundParcel);

    const canceledParcel = foundUser.orders[indexOfParcelForUser];

    foundUser.orders.splice(indexOfParcelForUser, 1);
    store.parcels.splice(indexOfParcelForParcels, 1);

    return res.send({ message: 'Parcel succefully canceled', parcel: canceledParcel });
  },
};
