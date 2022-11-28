const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./routes/Route.js')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
mongoose.connect('mongodb://localhost:27017/relations')
app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
