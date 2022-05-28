
///connection with mongoDB
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dataBase = "myapp";
const client = new MongoClient(url);
async function dbConnect() {
    let result = await client.connect();
    let db = result.db(dataBase);
    return db.collection('user');
}

module.exports = dbConnect;