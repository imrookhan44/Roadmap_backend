// const mongoose = require('mongoose');


// const mainApp = async () => {
    
//     await mongoose.connect('mongodb://localhost/MernFirstApp')

//     const productModel = mongoose.model('myapps', productSchema);
    
//     let data = new productModel({name: "imran", price: 100, quantity: 10})
//     let result = await data.save()
//     console.log(result)
    
// }
// mainApp();
// const productSchema = new mongoose.Schema({
//     name: String,
//     price: Number,
//     quantity: Number
// })

// ///update in mongoose
// const updateInDb = async () => {
//     const updateProduct = mongoose.model('myapps', productSchema)
//     const result  = await updateProduct.updateOne({name: "iphone"}, {$set: {name: "iphone 12 pro max"}})
// console.log(result)
// }
// updateInDb();
// const deleteInDb = async () => {
//     const deleteProduct = mongoose.model('myapps', productSchema)
//     const result = await deleteProduct.deleteMany({ name: "imran" })
//     console.log(result)
// }
// deleteInDb();


// const read = async () => {
//     const readProduct = mongoose.model('myapps', productSchema)
//     const result = await readProduct.find();
//     console.log(result)
// }
// read();