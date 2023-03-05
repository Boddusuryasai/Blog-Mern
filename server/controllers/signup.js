const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const account= require("../models/user")
const { validationResult } = require('express-validator');

    
const signup=async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
    try {
        const { username , email, password} = req.body;
        const checkuser =await account.findOne({ email });
        if(checkuser){
            res.status(400).json({ success:false, msg:"email already registered"})
        } 
               else{
               const encrpyted = await bcrypt.hash(password, 10)
         const newuser=  await account.create({
            username, 
            email,
            password: encrpyted
         }) 
          const payload = {id:newuser._id}
           const token = jwt.sign(payload,process.env.SECRET)
           res.status(200).json({ success:true, token,id:newuser._id})
        }
         
        
        }

        
     catch (error) {
        console.log(error)
        res.status(400).send("internal server error")
    }
}
module.exports=signup