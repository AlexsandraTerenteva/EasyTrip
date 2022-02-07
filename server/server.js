/* eslint-disable no-console */
require('dotenv').config();

const app = require('./app');
const { connect } = require('./db');

const { PORT } = process.env;

function conectToServer() {
  app.listen(PORT, () => console.log(`Соединен с сервером ${PORT}`));
}

connect()
  .then(conectToServer)
  .catch(process.exit);
