const JWT=require("jsonwebtoken");
const secret="faisal1122$5";

function createTokenForUser(user){
    const payload={
        _id:user._id,
        email:user.email,profileImage:user.profileImage,
        role:user.role
    }
        

    const token=JWT.sign(payload,secret);
     return token;
}

function ValidateTokenForUser(token){

    const payload=JWT.verify(token,secret);
    return payload

}

module.exports={
    createTokenForUser,
    ValidateTokenForUser

}