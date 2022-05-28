const dbConnect = require('./Mongodb');
const express = require("express");
const dataBase = 3000;
const app = express();

app.post('/', async (req, res) => {
    let allData = await dbConnect();
    allData = await allData.find({}).toArray();
    res.send();
})
app.listen(dataBase);