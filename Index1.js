const mongoose = require('mongoose')
const saveInDb = async () => {
    await mongoose.connect("mongodb://localhost:27017/MernFirstApp");
    const productModel = mongoose.model('myapp', productSchema);
    let data = new productModel({ name: "iphone",price: 1000, quantity: 10 });
    let result = await data.save();
    console.log(result);
}
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});
const updateInDb = async () => {
    const product = mongoose.model('myapps', productSchema);
    let data = await product.updateOne(
        { name: "iphone" },
        { $set: { name: "samsung" } }
    )
    console.log(data);


}
updateInDb();

