/* eslint-disable no-console */
import validator from 'validator';
import store from '../db/store';
import idGenerator from '../middlewares/ID_Generator';

class User {
  constructor(email, password, id) {
    this.email = email;
    this.password = password;
    this.id = id;
    this.orders = [];
  }
}


export default {
  createUser: (req, res) => {
    const newUser = req.body;

    if (!validator.isEmail(newUser.email)) {
      res.status(400).send({ error: 'Email invalid. Please signup with a valid email' });
    }

    const userID = idGenerator();
    const userDetails = new User(newUser.email, newUser.password, userID);

    if (newUser.password.length < 6 || typeof (newUser.password) !== 'string') {
      res.status(400).send({ error: 'The password needs to be 6 or more characters' });
    } else {
      store.users.push(userDetails);
      res.status(201).send({ email: newUser.email, id: userID });
    }
  },
  logUserIn: (req, res) => {
    const query = req.body;

    if (!query.email || !query.password) {
      res.status(400).send({ error: 'Password and Email required to log in.' });
    }

    if (store.users.length > 0) {
      const foundUser = store.users.find(element => element.email === query.email);
      if (!foundUser) {
        res.status(400).send({ error: 'The email or password is incorrect' });
      }
      if (query.password !== foundUser.password) {
        res.status(400).send({ error: 'The email or password is incorrect' });
      } else {
        res.status(200).send(foundUser);
      }
    } else {
      res.status(404).send({ error: 'Login credentials not found. please sign up' });
    }
  },
};
