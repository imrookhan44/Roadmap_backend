import User from "../models/AuthModel.js";
// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer';
// const bcrypt = require("bcrypt");
import bcrypt from 'bcrypt';
// const jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken';
const SECRET_KEY = "jwt";
const JWT_SECRET = "jwt";
const sendVerifyMail = async (name, email, user_id) => {
  // console.log('mail :',email,name,user_id);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Email verification",
    html:
      "<p><h2> " +
      email +
      ' Thanks For Registering On Our Site</h2> <h4>Please Verify Your Email To Continue....</h4> Click here to <a href="https://roadmap-backend.herokuapp.com/api/verify?id=' +
      user_id +
      '"> Verify </a> your mail.</p>',
  };
  transporter.sendMail(mailOptions, function (error, res) {
    if (error) {
      return console.log(error);
    } else {
    }
  });

  transporter.verify((error, success) => {
    if (error) {
      return console.log(error);
    } else {
    }
  });
};

const AuthControllers = {
  async signupUser(req, res) {
    const { name, email, phoneNumber, password } = req.body;
    let check = await User.findOne({ phoneNumber });
    if (!name || !email || !password || !phoneNumber) {
      return res
        .status(201)
        .json({ Error: true, msg: "Please enter all fields" });
    }
    if (check) {
      return res
        .status(201)
        .json({ msg: "Mobile Number Already Used", Error: true });
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        let hashedpassword = await bcrypt.hash(password, 12);

        const newUser = new User({
          name,
          email,
          phoneNumber,
          password: hashedpassword,
          verified: false,
        });
        await newUser.save().then((result) => {
          const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            SECRET_KEY
          );
          return res.status(201).json({
            newUser,
            token,
            msg: "User Created Successfully",
          });
        });
        if (newUser) {
          sendVerifyMail(name, email, newUser._id);
          return res.status("registration", {
            message:
              "your registration has been successfully, please verify your email",
          });
        }
      } else {
        res.status(201).json({
          status: false,
          Error: true,
          msg: "User Already Exist",
        });
        return res.status(201).json({ msg: "User Already Exist" });
      }
    } catch (error) {
      return console.log(error);
    }
  },
  async loginUser(req, res) {
    const { email, password } = req.body;
    if (password && email) {
      let user = await User.findOne({ email: email })
      if (!user) {
        return res.status(400).json({ message: 'User Not Found' });
      }
      let isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        const token = jwt.sign({ email: email }, SECRET_KEY);
        return res.status(201).json({
          user,
          token,
          msg: 'User Login Successfully'

        })
      }
    }
  },
  async verifyMail(req, res) {
    try {
      const updateInfo = await User.updateOne(
        { _id: req.query.id },
        { $set: { verified: true } }
      );
      console.log('update data',updateInfo);
      res.send(`<h1 style="text-align: center; margin-top: 100px;">Email Verified</h1>
    <p style="text-align: center; margin-top: 100px;">You can close this window now</p>
`,)
    } catch (error) {
      return console.log(error);
    }
  },
  async forgetPassword(req, res) {
    const {name, email,_id, password } = req.body;
    let user = await User.findOne({email})
    if (user) {
      let hashedpassword = await bcrypt.hash(password, 12)

      const updateInfo = await User.updateOne({ email },
        { $set: { password: hashedpassword } });
      return res.status(201).json({
        msg: 'success',
      })

    } else {
      return res.status(404).json({
        message: 'error'
      })
    }
  },
  async verificationPassword(req, res) {
    const {email} = req.body;
    let user = await User.findOne({email })
    // console.log('userda',user)
    if (user) {
      const secret=JWT_SECRET + user.password;
      const token = jwt.sign({email:user.email, id:user._id},secret,{
        expiresIn:"10m",
      });
      const link = `https://roadmap2k23.netlify.app/#/Forgetpassword/${user._id}/${token}`
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.AUTH_EMAIL,
          pass: process.env.AUTH_PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Password reset",
        text:link,
      };
      transporter.sendMail(mailOptions, function (error, res) {
        if (error) {
          return console.log(error);
        } else {
        }
      });
    
      transporter.verify((error, success) => {
        if (error) {
          return console.log(error);
        } else {
        }
      });
       res.status(201).json({msg:'message send successful'})
  } else {
      return res.status(404).json({
        message: 'error'
      })
    }
  },
  async passwordReset (req,res){
const {id,token}=req.params
try {
const oldUser = await User.findOne({_id:id});
if (!oldUser){
return res.status(400).json({msg:"user not found"})
}
// console.log('data',oldUser)
  const secret = JWT_SECRET + oldUser.password;
  // console.log('secret',secret)
  const verify= jwt.verify(token,secret);
  // console.log('verify',verify)
 return res.status(200).json({msg:'Verified'})

} catch (error) {
  return res.status(400).json({msg:'Token Expired'})
  
}
  },


  async updateSignup (req,res){
    const {_id,name ,email ,phoneNumber,profilePicture}= req.body
    if (_id){
    const update = await User.findOneAndUpdate({_id},
      {$set:{name,email,phoneNumber,profilePicture}})
    return res.status(200).json({msg:'Successfully Updated'})
    } else {
      return res.status(404).json({msg:'Not Found'})
    }
  },
  async userData (req,res){
const {_id}=req.body
if (_id){
  const allData= await User.findById(_id)
return res.status(200).json({allData,msg:'Get User All Data'})
}else {
  return res.status(404).json({msg:'No User Data Found'})
}
}
}


export default AuthControllers;
