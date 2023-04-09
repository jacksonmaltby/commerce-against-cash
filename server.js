require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection.js')
// import sequelize connection

const Product = require('./models/Product');
const Category = require('./models/Category');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    await sequelize.sync({ force: false });
    console.log('All models were synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();