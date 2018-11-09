/* eslint-disable no-console */
import server from './app';

server.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the send-IT service. Navigate to /user/create or /user/login to get authenticated and start sending orders',
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server is listening on port ${port}`));
