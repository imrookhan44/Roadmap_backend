const dbConnect = require('./Mongodb');


const deleteData = async() => {
    let data = await dbConnect();
    let result = await data.deleteOne({ name: "imran" });
    console.log("deleetd", result);
    
    
}

deleteData();