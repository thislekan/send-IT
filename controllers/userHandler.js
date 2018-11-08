/* eslint-disable no-console */
import store from '../db/store';
import idGenerator from '../middlewares/ID_Generator';

class User {
  constructor(email, password, id) {
    this.email = email;
    this.password = password;
    this.id = id;
    this.order = [];
  }
}


export default {
  createUser: (req, res) => {
    const newUser = req.body;
    const userID = idGenerator();
    const userDetails = new User(newUser.email, newUser.password, userID);
    store.user.push(userDetails);
    res.status(201).send({ email: newUser.email, id: userID });
    console.log('create user');
  },
  confirmUser: (req, res, next) => {
    const query = req.body;
    if (!query.email || !query.password) {
      res.status(400).send({ error: 'Email and password are required.' });
    }
    if (store.user.length > 0) {
      for (let i = 0; i < store.user.length; i += 1) {
        const element = store.user[i];
        if (element.email === query.email) {
          res.status(403).send({ error: 'The user already exist.' });
        } else {
          next();
        }
      }
    } else {
      next();
    }
  },
  logUserIn: (req, res) => {
    const query = req.body;
    if (!query.email || !query.password) {
      res.status(400).send({ error: 'Password and Email required to log in.' });
    }
    console.log(store.length);

    if (store.user.length > 0) {
      // const founduser = store.user.find((element) => {
      //   if ((element.email === query.email) && (element.password === query.password)) {
      //     console.log(element);
      //     return element;
      //     // return element;
      //   }
      // });
      // res.send(founduser);
      for (let i = 0; i < store.user.length; i += 1) {
        const element = store.user[i];
        if ((element.password !== query.password) && (element.email !== query.email)) {
          res.status(400).send({ error: 'This user does not exist.' });
        } else {
          console.log(element);
          console.log(query);
          const userDetails = { email: element.email, id: element.id, order: element.order };
          res.status(200).send(userDetails);
        }
      }
    } else {
      res.status(404).send({ error: 'Login credentials not found. please sign up' });
    }
  },
};
