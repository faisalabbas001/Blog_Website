const { createHmac, randomBytes } = require("crypto");
const {createTokenForUser}=require("../services/authentication")
const {Schema,model}=require("mongoose");

const UserModel=new Schema({

    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
         unique:true,
         required:true
    },
    salt:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
  profileImage:{
    type:String,
    default: "/public/images/user.png",
  },
  role:{
    type:String,
    enum:["admin","user"],
    default:"user"
  }

},{timestamps:true})


UserModel.pre("save", function (next) {
    const user = this;
  
    if (!user.isModified("password")) return next();
  
    const salt = randomBytes(16).toString("hex");
    const hashPassword = createHmac("sha256", salt).update(user.password).digest("hex");
  
    user.salt = salt;
    user.password = hashPassword;
  
    next();
  });
  



  // Static method for password matching
  UserModel.statics.matchPasswordandGenerateToken = async function (email, plainPassword) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");

  const userProvidedHash = createHmac("sha256", user.salt).update(plainPassword).digest("hex");

  if (user.password !== userProvidedHash) throw new Error("Incorrect Password");

 
   const token=createTokenForUser(user);
   return token
};






const User=model("user",UserModel);

module.exports=User