import mongoose from "mongoose";

const dbConnect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL!);
        console.log('CONNECTED ON MONGODB SUCESS...');
    } catch (error){
        console.log('CONNECTED ON MONGODB FAILED...');
        process.exit(1);

    }
}

export default dbConnect;