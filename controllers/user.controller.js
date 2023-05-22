const {UserModel}=require("../models/user.model")
const {BlacklistModel}=require("../models/blacklist.model")
require("dotenv").config()
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")



const register=async (req,res)=>{

    let {name,email,password,role}=req.body

    try {
        let user=await UserModel.findOne({email})
        if(user){
            return res.status(400).send({"msg":"already exist please login"})
        }
        const hash = bcrypt.hashSync(password, 6);
        let newuser=new UserModel({name,email,password:hash,role:role})
        await newuser.save()
        return res.status(200).send({"msg":"User registered successfully"})

    } catch (error) {
         return res.status(400).send(error)
    }
}




const login=async (req,res)=>{

    const {email,password}=req.body;

    try {
        
        const user=await UserModel.findOne({email})

        if(user){

            bcrypt.compare(password, user.password, (err, result)=> {
                
                if(result){

                    const accessToken=jwt.sign({authorID:user._id,authorRole:user.role},process.env.AccessToken,{expiresIn:60*1})
                    const rerefreshToken=jwt.sign({authorID:user._id,authorRole:user.role},process.env.RerefreshToken,{expiresIn:60*5})

                    res.cookie(`accessToken`,accessToken)
                    res.cookie(`rerefreshToken`,rerefreshToken)

                    res.status(200).send({"success":true,msg:"login successfully"})

                }else{
                    return res.status(400).send({"error":"Invalid Password"})
                }
            });

        }else{
            return res.status(400).send({"msg":"User NOt Found"})
        }

    } catch (error) {
         return res.status(400).send({"error":error.message})
    }
}

const logout=async(req,res)=>{

    const token=req.cookies.accessToken
    try {
        
        const blacklistedToken = new BlacklistModel({ token });
        await blacklistedToken.save();
        return res.status(200).send('Logged out successfully');
    } catch (error) {
        console.error(err);
        return res.status(500).send('Server error');
    }
}







module.exports={register,login,logout}