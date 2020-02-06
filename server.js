require('dotenv').config(); //In order to load the dotenv variables
const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();

app.use(bodyParser.json());
const userRoutes = require('./controllers/users');

app.use('/users', userRoutes);

const mongoose = require ('mongoose');

const dbPath = process.env.DATABASE_URL;

mongoose.connect( dbPath, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


db.on('error', (error) => {
  console.error(error);
});

db.once('open', () => {
  console.log('Opened the database');
});

app.listen(3000, () => console.log('Server started'));