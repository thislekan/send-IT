import store from '../db/store'

const authenticate = (req, res, next) => {
    res.send('Route Found');
    // console.log(store);
}

export { authenticate as default }
