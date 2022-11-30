const express = require('express')
const cors = require("cors");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./src/routes/Route.js');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database connected')
});
app.listen(9000, () => {
  console.log('Server listening on port 9000!');
});
