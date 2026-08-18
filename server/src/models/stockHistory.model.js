import mongoose from "mongoose";


const stockHistorySchema = new mongoose.Schema(
{
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },

    previousQuantity:{
        type:Number,
        required:true
    },

    newQuantity:{
        type:Number,
        required:true
    },

    change:{
        type:Number,
        required:true
    },

    type:{
        type:String,
        enum:[
            "STOCK_IN",
            "STOCK_OUT"
        ],
        required:true
    },

    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},
{
    timestamps:true,
    versionKey:false
});


export default mongoose.model(
    "StockHistory",
    stockHistorySchema
);