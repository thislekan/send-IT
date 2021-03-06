import store from '../db/store';

const confirmUser = (req, res, next) => {
  const query = req.body;
  if (!query.email || !query.password) {
    return res.status(400).send({ error: 'Email and password are required.' });
  }
  const alreadyExist = store.users.findIndex(element => element.email === query.email);
  if (alreadyExist !== -1) {
    return res.status(403).send({ error: 'The user already exist.' });
  }
  return next();
};

export default confirmUser;
