var mongoose = require('mongoose');

var UserVerificationSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  uniqueString: {
    type: String,
   
  },
  createdAt:{
    type: Date,
    
  }
,
  expiresAt: {
    type: Date,
  }
});
const UserVerification = mongoose.model('UserVerification', UserVerificationSchema);
module.exports = UserVerification ;