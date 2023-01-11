import express from 'express'
import cors from "cors";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './src/routes/Route.js';

import dotenv from 'dotenv'
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", express.static("public"));
app.use('/api', router);
app.use(cors({             //Cross-Origin Resource Sharing
  origin:true,             //allows a server to indicate any origins (domain, scheme, or port) other than its own from which
                          // a browser should permit loading resources. 
  credentials:true,
  methods:["GET","POST","PUT","DELETE"]
}));

mongoose.connect(process.env.DATABASE_URL1)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database connected')
});
app.listen(process.env.PORT || 9000, () => {
  console.log('Server listening on port 9000');
});
