const bcrypt= require("bcrypt");
const hashPassword= async(password)=>{
   return await bcrypt.hash(password,10)
}
const comparePassword=async()=>{
    return await bcrypt.compare(password,hashpassword)
}

module.exports={hashPassword,comparePassword}
