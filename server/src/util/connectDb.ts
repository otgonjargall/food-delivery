import mongoose, { connect } from "mongoose";

const URI =process.env.MONGODB_URI;

export  const connectDb = async( )=>{
    
    try{
        if (!URI){
        console.log("URI BAIHGUI BN");
        return;
    }
    await mongoose.connect(URI);
    console.log("DB TEI AMJILTAI HOLBODLOO")

    }catch(error){
        console.log("BD TEI HOLBOGDOHOD ALDAA GARLAA")
    };
    
    
}