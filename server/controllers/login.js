const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const account= require("../models/user")
const { validationResult } = require('express-validator');

    
const login=async (req,res)=>{
    try {
        const {  email, password} = req.body;
        if(!email && ! password){
            res.status(401).send("email and password are mandatory")
        
        }
        const checkuser =await account.findOne({ email });
        if (checkuser && (await bcrypt.compare(password, checkuser.password))){ 
                const payload = {id:checkuser._id}
                const token = jwt.sign(payload,process.env.SECRET)
                res.status(200).json({ success:true, token})
             }
             else{
       
             res.status(400).send("email or password is incorrect")
             }
           }
          

        
     catch (error) {
        console.log(error)
        res.status(400).send("internal server error")
    }
}
module.exports=login