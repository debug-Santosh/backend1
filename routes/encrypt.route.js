const {Router}=require("express")
const EncryptRoute=Router()
const {EncryptModel}=require("../models/encryptmypwd.model")
const encryptPassword = require('encrypt-password');
const encryptpwd = require('encrypt-with-password');
const loki="loki"

EncryptRoute.post("/encryptmypwd",async(req,res)=>{
    let {id,password}=req.body;

    try {
        const encrypted = encryptpwd.encrypt(loki, password)
        let newuser=new EncryptModel({id,password:encrypted})
        await newuser.save()
        return res.status(200).send({"msg":"Password stored successfully in encrypted form"})
    } catch (error) {
        return res.status(400).send(error.message)
    }

})

EncryptRoute.get("/getmypwd",async(req,res)=>{
    let {id}=req.query
    try {
        let user=await EncryptModel.findOne({id:id})
        if(user){
            const decrypted = encryptpwd.decrypt(loki, user.password) 
            console.log(decrypted)
            return res.status(200).send(decrypted)
        }else{
            return res.status(401).send("user id is not find in db")
        }
        return res.status(200).send()
    } catch (error) {
         return res.status(400).send(error.message)
    }

})

module.exports={EncryptRoute}