const express = require("express");
const app = express();
const dataBase = 3000;
const dbConnect = require('./Mongodb');

app.delete('/', async (req, res) => {
    let allData = await dbConnect();
    let result = await allData.deleteOne({ name: "iphone" });
    console.log("deleetd", result);
    res.send(result);
}
)
app.listen(dataBase);