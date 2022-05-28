const express = require("express");
const dbConnect = require('./Mongodb')
const dataBase = 3000;
const app = express();
app.get('/', async (req, res) => {

    let allData = await dbConnect();
    
    allData = await allData.find({}).toArray();
    res.send(allData);
    
})
app.listen(dataBase);




