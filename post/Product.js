const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
 confirmPassword: String,
});
module.exports =    mongoose.model('myapps', ProductSchema);