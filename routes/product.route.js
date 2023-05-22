const {Router}=require("express")
const ProductRoute=Router()
const {verify}=require("../middlewares/VerifyRole.middleware")
const {auth}=require("../middlewares/auth.middleware")
const{productAdd,productDelete,productGetAll}=require("../controllers/product.controller")

ProductRoute.post("/addproducts",auth,verify(["seller"]),productAdd)

ProductRoute.get("/products",auth,verify(["User","seller"]),productGetAll)

ProductRoute.delete("/deleteproducts",auth,verify(["seller"]),productDelete)

module.exports={ProductRoute}