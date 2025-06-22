const mongoose = require("mongoose")
const pgSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        default:""
    },
    address:{
        type:String,
        required:true,
        default:""
    },
    city:{
        type:String,
        required:true,
        default:""
    },
    rent:{
        type:Number,
        required:true,
       default:""
    },
    ownername:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    }
})

const PG = mongoose.models.PG || mongoose.model("PG",pgSchema)

module.exports = PG