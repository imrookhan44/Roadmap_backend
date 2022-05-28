const dbConnect = require('./Mongodb');
const updateData = async () => {
    let data = await dbConnect();
    let res = await data.updateOne({ name: "iphone" }, { $set: {name: "imran"  } });
    console.log(res);
}
updateData();