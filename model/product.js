const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        image:{
            type:String,
            default:{
                path:"https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
            }
        },
        desc:{
            type:String,
            required:true,
            trim:true
        },
        price:{
            type:Number,
            required:true
        },
        SKU:{ // stock keeping unit
            type:String,
            default:[]
        },
        category:{
            type:String,
            required:true,
            trim:true
        },
        discount:{
            type:Number,
            default:0  
        },
        isActive:{
            type:Boolean,
            default:true
        }

    },{
        collection:"products",
        timestamps:true
    }
)

module.exports = mongoose.model("Product", ProductSchema)