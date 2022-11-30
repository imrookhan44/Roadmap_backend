const User = require('../models/AuthModel')
const UserVerification= require('../models/UserVerification')
const nodemailer = require ('nodemailer')
const {v4: uuidv4} = require('uuid')
require  ('dotenv').config();
const jwt = require ('jsonwebtoken')
const SECRET_KEY = "jwt"
// let transporter = nodemailer.createTransport({
//   service:"gmail",
//   auth:{
//       user: process.env.AUTH_EMAIL,
//       pass: process.env.AUTH_PASSWORD,
//   }
// })
// transporter.verify((error,success)=>{
//   if(error) {
//     console.log(error);
//   }else{
//     console.log(success);
//   }
// })

const AuthControllers ={
    async signupUser(req,res){
            
        const {name,email,phoneNumber,password,confirmPassword} = req.body;
        let check = await User.findOne({ phoneNumber});
    if (check) {
      return res.status(201).json({ msg: 'Mobile Number Already Used', Error: true });
    }
    if (!name || !email || !password || !phoneNumber || !confirmPassword) {
      return res.status(201).json({ Error: true, msg: 'Please enter all fields' });
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        const newUser = new User({
            name,
            email,
            phoneNumber,
            password,
            confirmPassword
          });
          await newUser.save().then((result)=>{
            const token = jwt.sign({email:newUser.email, id:newUser._id},SECRET_KEY)
            return res.status(201).json({
              newUser,
              token ,
              msg: 'User Created Successfully' });
          });

         
            

      }
      else {
        res.status(201).json({
            status: false,
            Error: true,
            msg: "User Already Exist"
          })
          return res.status(201).json({ msg: 'User Already Exist' });
      }
    } catch (e) {
      res.status(400).json({ Error: true, msg: e.message });
    }
    console.log("new user",res)
  },
  async loginUser(req,res){
    const {email,password,id} = req.body;
    if (password && email){
      let user = await User.findOne({email:email,password:password}).select("-password");
      if (!user){
      return  res.status(400).json({message:'User Not Found'});
      }
      const token = jwt.sign({email:email ,id : id},SECRET_KEY);
      return res.status(201).json({
        user,
        token,
        msg: 'User Login Successfully'
        
      });
    }
else {
  res.send({result:"Invalid Credentials"});
}
    }
  }



module.exports = AuthControllers;