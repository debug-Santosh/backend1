const {ProductModel}=require("../models/product.model")

const productAdd=async(req,res)=>{
    const {title}=req.body;
    try {
        const product=new ProductModel({title});
        await product.save();
        return res.status(200).send(product)
    } catch (error) {
        res.status(400).send({error:error.message});
    }
}

const productDelete=async(req,res)=>{
    try {
        const data=await ProductModel.deleteMany({});
        return res.status(200).send(`all product are deleted form database!`)
    } catch (error) {
        res.status(400).send({error:error.message});
    }
}

const productGetAll=async(req,res)=>{
    try {
        let allproducts=await ProductModel.find()
        return res.status(200).send(allproducts)
    } catch (error) {
        res.status(400).send({error:error.message});
    }
}


module.exports={productAdd,productGetAll,productDelete}