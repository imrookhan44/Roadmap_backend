const express = require("express");
const dbConnect = require('./Mongodb')
const dataBase = 3000;
const app = express();
app.use(express.json());
app.put('/', async (req, res) => {
    let allData = await dbConnect();
    let result = allData.updateOne({
        name: "samsung"
    },
    
        {
            $set: req.body
     }
    
    );

    res.send(
        {result: "success"}
    );
    

    
})
app.listen(dataBase);