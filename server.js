/* eslint-disable no-console */
import server from './app';

server.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the send-IT service.',
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server is listening on port ${port}`));
