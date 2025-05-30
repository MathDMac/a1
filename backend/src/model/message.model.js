import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    text:{
        type:String
    },
    image:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}, {timestamps:true})

const Message = mongoose.model("Message",messageSchema)

export default Message