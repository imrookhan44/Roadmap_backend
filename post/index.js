const express = require('express');
const app = express();
const port = 5000;
require("./Config")
const product = require('./Product');
app.use(express.json());
app.post('/product', (req, res) => {
    res.send(product.create(req.body));
    console.log(req.body);
});
app.listen(port, () => console.log(`Listening on ports ${port}`));

