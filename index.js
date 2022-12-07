const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./src/routes/Route.js');
const cors =require("cors")
require("dotenv").config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));//bodyparser humarey sath json format ku handle karta a ju frontend s ata a
app.use(bodyParser.json());
app.use(cors({             //Cross-Origin Resource Sharing
  origin:true,             //allows a server to indicate any origins (domain, scheme, or port) other than its own from which
                          // a browser should permit loading resources. 
  credentials:true,
  methods:["GET","POST","PUT","DELETE"]
}));

app.use('/api', router);




mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database connected')
});

  app.listen(4000, () => {
    console.log('Server listening on port 4000!');
  });
 