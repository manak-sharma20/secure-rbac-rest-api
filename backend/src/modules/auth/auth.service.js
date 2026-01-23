const User= require("../users/user.model");
const {hashPassword,comparePassword}=require("../../utils/hash");
const generateToken= require("../../utils/jwt");

const registerUser= async({name,email,password})=>{
    const existingUser= await User.findOne({email});
    if (existingUser){
        const error = new Error("User already exists");
        error.status=400;
        throw error;
    }
    const hashedPassword= await hashPassword(password);
    const user= await User.create({
        name,email,password:hashedPassword
    })
    return {
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role

    }
}
const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password")}
    if(!user){
        const error = new Error("Invalid email or password");
        error.status = 401;
        throw error;
    }
    const isMatch= await comparePassword(password,user.password)
    if(!isMatch){
        const error = new Error("Invalid email or password");
        error.status = 401;
        throw error;
    }
    const token = generateToken({
        userId: user._id,
        role: user.role,
      });
    
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
  
  module.exports={registerUser,loginUser}
