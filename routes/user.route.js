const {Router}=require("express")
const userRoute=Router()
const {verify}=require("../middlewares/VerifyRole.middleware")
const {auth}=require("../middlewares/auth.middleware")
const {register,login,logout}=require("../controllers/user.controller")


userRoute.post("/signup",register)
userRoute.post("/login",login)
userRoute.post("/logout",auth,logout)







module.exports={userRoute}