const mongoose=require("mongoose");
const connectDB= async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{db:process.env.DB_NAME
        })
        console.log(`MongoDB connected: ${conn.connection.host}`);

    }
    catch(error){
        console.error("MongoDB conncection failed",error.message)
        process.exit(1)

    }
}
module.exports=connectDB;