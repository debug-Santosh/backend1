const mongoose=require("mongoose")

const hashmypwdSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }, {
    versionKey : false,
    timestamps :true
});

const HashModel=mongoose.model("hashedpwd",hashmypwdSchema)

module.exports={HashModel}