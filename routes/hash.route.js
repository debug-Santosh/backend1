const {Router}=require("express")
const HashRoute=Router()
const bcrypt = require('bcrypt');
const {HashModel}=require("../models/hashmypwd.model")


HashRoute.post("/hashmypwd", async(req,res)=>{
    let {id,password}=req.body;

    try {
        const hash = bcrypt.hashSync(password, 6);
        let newuser=new HashModel({id,password:hash})
        await newuser.save()
        return res.status(200).send({"msg":"Hash of the Password stored successfully."})
    } catch (error) {
        return res.status(400).send(error)
    }
})

HashRoute.post("/verifymypwd",async(req,res)=>{
    let {id,password}=req.body;

    try {
        const user=await HashModel.findOne({id})

        if(user){

            bcrypt.compare(password, user.password, (err, result)=> {
                
                if(result){

                    res.status(200).send({"success":true})

                }else{
                    return res.status(400).send({"success":false})
                }
            });

        }else{
            return res.status(400).send({"success":false})
        }
        
    } catch (error) {
        return res.status(400).send({"error":error.message})
    }

})


module.exports={HashRoute}