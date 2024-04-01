const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:User
    },
    products:{
        type:Array,
        default:[]
    }
},{
    collection:"carts",
    timestamps:true
})

module.exports = mongoose.model("Cart", CartSchema)