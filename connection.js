const mongoose=require("mongoose");


async function ConnectedDataBase(url){
    return mongoose.connect(url)

}

module.exports=ConnectedDataBase