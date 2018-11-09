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
    const { userid } = req.headers;
    const query = req.body;
    const parcelID = idGenerator();
    const newOrder = new Order(parcelID, query.pickup, query.destination, userid);

    if (store.users.length > 0) {
      const foundUser = store.users.find(element => element.id === userid);
      if (!foundUser) {
        res.status(400).send({ error: 'User does not exist.' });
      } else {
        foundUser.orders.unshift(newOrder);
        store.parcels.unshift(newOrder);

        res.status(201).send(newOrder);
      }
    } else {
      res.status(401).send({
        error: 'User not authorized to create parcel. Please sign up.',
      });
    }
  },
  getAllParcels: (req, res) => {
    if (store.parcels.length < 1) {
      res.status(404).send({ error: 'No parcel record found.' });
    } else {
      const allParcels = store.parcels;
      res.status(200).send(allParcels);
    }
  },
  getParcelsById: (req, res) => {
    const query = req.params.parcelId;

    if (!store.parcels.length) {
      res.status(404).send({ error: 'No parcel record exist in Database' });
    } else {
      const foundParcel = store.parcels.find(element => element.id === query);

      if (!foundParcel) {
        res.status(404).send({ error: `Parcel with ID: ${query} not found` });
      } else {
        res.status(200).send(foundParcel);
      }
    }
  },
  getUserParcels: (req, res) => {
    const query = req.params.userId;

    if (store.users.length < 1) {
      res.status(404).send({ error: 'No parcel record exist on the Database yet.' });
    } else {
      const foundUser = store.users.find(element => element.id === query);

      if (!foundUser) {
        res.status(404).send({ error: 'No parcel record for the user exist' });
      } else {
        res.status(200).send(foundUser.orders);
      }
    }
  },
  cancelParcel: (req, res) => {
    const { parcelId } = req.params;
    const { userid } = req.headers;

    if (!store.parcels.length) {
      res.status(404).send({ error: 'No parcel record exist on the Database yet.' });
    } else {
      const foundParcel = store.parcels.find(element => element.id === parcelId);
      const foundUser = store.users.find(element => element.id === userid);

      if (!foundParcel) {
        res.status(404).send({ error: `No parcel with ID: ${parcelId} was found` });
      }

      if (foundParcel.user !== userid) {
        res.status(401).send({ error: 'You are not authorized to change this parcel' });
      } else {
        const indexOfParcelForUser = foundUser.orders.indexOf(foundParcel);
        const indexOfParcelForParcels = store.parcels.indexOf(foundParcel);

        const canceledParcel = foundUser.orders[indexOfParcelForUser];

        foundUser.orders.splice(indexOfParcelForUser, 1);
        store.parcels.splice(indexOfParcelForParcels, 1);

        res.send({ message: 'Parcel succefully canceled', parcel: canceledParcel });
      }
    }
  },
};
