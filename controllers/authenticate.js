/* eslint-disable no-console */
import store from '../db/store';


const authenticate = (req, res, next) => {
  res.send('Route Found');
  console.log(store);
  next();
};


export { authenticate as default };
