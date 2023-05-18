import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    }
})
export const productModel = mongoose.model("products",productSchema)