var mongoose = require('mongoose');

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
  confirmPassword: {
    type: String,
    required: true
  },
verified:{
    type: Boolean,
    default: false
}
});
const User = mongoose.model('User', UserSchema);
module.exports = User;