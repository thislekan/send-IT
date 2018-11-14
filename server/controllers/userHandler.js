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
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).send({ error: 'Email invalid. Please signup with a valid email' });
    }

    const userID = idGenerator();
    const userDetails = new User(email, password, userID);

    if (password.length < 6 || typeof (password) !== 'string') {
      return res.status(400).send({ error: 'The password needs to be 6 or more characters' });
    }

    store.users.push(userDetails);
    return res.status(201).send({ email, id: userID });
  },
  logUserIn: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: 'Password and Email required to log in.' });
    }

    if (store.users.length > 0) {
      const foundUser = store.users.find(element => element.email === email);
      if (!foundUser) {
        return res.status(400).send({ error: 'The email or password is incorrect' });
      }
      if (password !== foundUser.password) {
        return res.status(400).send({ error: 'The email or password is incorrect' });
      }
      return res.status(200).send(foundUser);
    }
    return res.status(404).send({ error: 'Login credentials not found. please sign up' });
  },
};
