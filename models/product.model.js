const mongoose=require("mongoose")

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      }
  }, {
    versionKey : false,
    timestamps :true
});

const ProductModel=mongoose.model("Product",productSchema)

module.exports={ProductModel}