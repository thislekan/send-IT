/* eslint-disable no-console */
import Sequelize from 'sequelize';

const sequelize = new Sequelize('send_it', 'thislekan', '123phoe5', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
});

export default {
  startUpDB: () => {
    sequelize
      .authenticate()
      .then(() => console.log('Connection established'))
      .catch((error) => { console.log('Unable to connect:', error); });
  },
};
