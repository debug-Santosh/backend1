const mongoose=require("mongoose")

const encryptmypwdSchema = new mongoose.Schema({
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

const EncryptModel=mongoose.model("encryptedpwd",encryptmypwdSchema)

module.exports={EncryptModel}