import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength: 6
    },
    profilePic:{
        type:String,
        default:""
    },
    description:{
        type:String, 
        default: ""
    },
    contacts: [{
        type:mongoose.Schema.Types.ObjectId, 
    }]

}, {timestramps:true})

const User = mongoose.model("User", userSchema)
export default User