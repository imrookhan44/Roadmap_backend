import mongoose from "mongoose";

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber:{
    type: String,
    required: true
  }
,
  password: {
    type: String,
    required: true
  },
  profilePicture: {
     type: String,
  },
  
verified:{
    type: Boolean,
    default: false
},
editPassword: {
type: Boolean,
default: false
}
},{timestamps:true})
const User = mongoose.model('User', UserSchema);
export default User;