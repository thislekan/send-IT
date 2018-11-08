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
    // console.log(req.headers);
    const { userid } = req.headers;
    const query = req.body;
    const parcelID = idGenerator();
    const newOrder = new Order(parcelID, query.pickup, query.destination, userid);

    if (store.user.length > 0) {
      for (let i = 0; i < store.user.length; i += 1) {
        const element = store.user[i];
        // console.log(element);
        // console.log(userid);
        if (element.id === userid) {
          element.order.unshift(newOrder);
          store.parcels.unshift(newOrder);
          res.status(201).send(newOrder);
        } else {
          res.status(400).send({ error: 'User does not exist.' });
        }
      }
    } else {
      res.status(401).send({ error: 'User not authorized to create parcel. Please sign up.' });
    }
  },
  getAllParcels: (req, res) => {
    // const userid = req.headers;
    if (store.parcels.length < 1) {
      res.status(404).send({ error: 'No parcel record found.' });
    } else {
      console.log(store.parcels);
      const allParcels = store.parcels;
      res.status(200).send(allParcels);
    }
  },
  getParcelsById: (req, res) => {
    const query = req.params.id;
    if (store.parcels.length < 1) {
      res.status(404).send({ error: 'No parcel record exist in Database' });
    } else {
      for (let i = 0; i < store.parcels.length; i += 1) {
        const element = store.parcels[i];
        if (element.id === query) {
          res.status(200).send(element);
        }
      }
      res.status(404).send({ error: `Parcel with ID: ${query} not found` });
    }
  },
  getUserParcels: (req, res) => {
    const query = req.params.userid;

    if (store.user.length < 1) {
      res.status(404).send({ error: 'No parcel record exist on the Database yet.' });
    } else {
      for (let i = 0; i < store.user.length; i += 1) {
        const element = store.user[i];
        if (element.id === query) {
          res.status(200).send(element.order);
        }
      }
      res.status(404).send({ error: 'No parcel record for the user exist' });
    }
  },
};
