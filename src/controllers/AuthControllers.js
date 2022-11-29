const User = require('../models/AuthModel')
const jwt = require ('jsonwebtoken')
const SECRET_KEY = "jwt"
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
            const token = jwt.sign({email:result.email},SECRET_KEY)
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
    if (req.body.password && req.body.email){
      let user = await User.findOne(req.body).select("-password");
      const token = jwt.sign({email:user.email},SECRET_KEY);
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