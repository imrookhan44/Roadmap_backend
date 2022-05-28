//simple api in node js
// const http = require('http');
// const data1 = require('./Data');
// function data(req, res) {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.write(JSON.stringify({
//        data1
//     }));
//     res.end();
// }
// http.createServer(data).listen(3000);



///input from command line
// const fs = require('fs');
// const input = process.argv;
// if (input[2] === 'read') {

//     fs.writeFileSync(input[2], input[3]);
// } else if (input[2] === 'remove') {
//     fs.unlinkSync(input[3]);
// } else {
//     console.log('invalid input');
// }

//how to create a simple file in node js

// const fs = require("fs");

// fs.writeFileSync("apple.txt", "here will be some data about fruits");


///how to remove a file in node js
// const fs = require("fs");
// fs.unlinkSync("apple.txt");


//how to make multiple files in node js
// const fs = require("fs");
// const path = require("path");
// const dirName = path.join(
//     __dirname, 'Files'
// );
// for (i = 0; i < 4; i++){

//     fs.writeFileSync(`${dirName}/file${i}.txt`, `this is file ${i}`);

// }

//crud operation in node js
// const fs = require("fs");
// const path = require('path');
// const dirPath = path.join(__dirname, 'Crud');
// const filePath = `${ dirPath }/file1.txt`

//for create file
// fs.writeFileSync(filePath, 'this is the first file');

//for read file
// fs.readFile(filePath, "utf-8", (err, data) => {
//     console.log(data);
// }
// );
//update file

// fs.appendFile(filePath, 'my name is imran khan and i love coding', (err) => {
//     if(!err){
//         console.log('file updated');
//     }

// })

//for to delete file
// fs.unlinkSync(filePath);


///asyncrhonous in node js
// console.log("hello imran");
// setTimeout(() => {
//     console.log("hello hamza")
// }, 2000)

// console.log("hello nasir")


///how to handle asny data in node js
// let a = 20;
// let b = 0;


// let waitData = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(30)
//     }, 2000);
// })
// waitData.then((data) => {
//     console.log(a + data)
// })

///express js with node js
// const express = require("express");
// const app = express();
// const port = 3000;
// app.get('/', (req, res) => {
//     res.send("hello nasir bhai");
// })
// app.listen(port)


///middleware in node js

// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (res, req) => {
//     res.send("about page")
// })
// app.get("/about", (res, req) => {
//     res.send("this is about page")
// })
// app.listen(port)

///middleware in node js

// const express = require("express");
// const res = require("express/lib/response");
// const app = express();
// const port = 3000;


// //middleware
// const filterData = (req, res, next) => {
//     if (!req.query.age) {
//         res.send("please enter age");
//     } else if (req.query.age < 18) {
//         res.send("you are not eligible to vote");


//     }
//     else {
//         next();
//     }
// }
// app.use(filterData);
// app.get('/', (request, response) => {
//     response.send("welcome to home page");
// })
// app.get('/userPage', (request, response) => {
//     response.send("welcome to user page");
// })
// app.listen(port)

//if want to add middleware on specific page in node js
// const express = require("express");
// const app = express();
// const port = 3000;
// const filterData = require('./MiddleWare')
// const route = express.Router();

// app.get('/',  (req, res) => {
//     res.send("welcome to home page");
// })
// route.get('/user', filterData, (req, res) => {
//     res.send("welcome to user page");
// })
// app.use('/', route);

// app.listen(port)


//mongodb in node js
// const {mongoClient} = require('mongodb');
// or
// const mongoClient = require('mongodb').mongoClient;

// const { MongoClient } = require('mongodb');
// const url = 'mongodb://localhost:27017';
// const dataBase = "myapp";
// const client = new MongoClient(url);
// async function maindata() {
//     let result = await client.connect();
//     let db = result.db(dataBase)
//     let collection = db.collection('user');
//     let response = await collection.find({}).toArray();
//     console.log(response);
// }
// maindata();


const { response } = require('express');
const dbConnect = require('./Mongodb');
// dbConnect().then((response) => {
// response.find().toArray().then((data) => {
//       console.log(data);  
//     });
// })

const main = async () => {
    let data = await dbConnect();
    data = await data.find().toArray();
    console.log(data);
}
main();