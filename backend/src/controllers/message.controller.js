import cloudinary from "../utils/cloudinary.js"
import User from "../model/user.model.js"
import Message from "../model/message.model.js"
import {io, getSocketId} from "../../index.js"

export const getMessage = async (req, res) => {
    try {
        const { id: otherId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: req.user._id, receiverId: otherId },
                { senderId: otherId, receiverId: req.user._id }
            ]
        }).sort({ createdAt: 1 });

        return res.status(200).json( messages );
    } catch (error) {
        console.log("Erro no getMessage", error);
        return res.status(500).json({ message: "Erro no servidor" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { text, image } = req.body;

        let imageMessage = "";

        if (image) {
            const imageUpload = await cloudinary.uploader.upload(image);
            imageMessage = imageUpload.secure_url;
        }

        const newMessage = new Message({
            senderId: req.user._id,
            receiverId,
            text,
            image: imageMessage
        });

        await newMessage.save();

        const otherId = getSocketId(receiverId)
        if(otherId){
            io.to(otherId).emit("newMessage", newMessage)
        }

        return res.status(200).json(newMessage);

    } catch (error) {
        console.log("Erro no sendMessage", error);
        return res.status(500).json({ message: "Erro no servidor" });
    }
};

export const getAllMenssages = async (req, res) => {
    const user = req.user;
    try {
      const messagesReceiverId = await Message.find({
        $or: [
          { senderId: user._id },
          { receiverId: user._id },
        ],
      }).select("senderId receiverId");
  
      let messagesUserId = messagesReceiverId.flatMap(msg => {
        const ids = [];
        if (msg.senderId) ids.push(msg.senderId.toString());
        if (msg.receiverId) ids.push(msg.receiverId.toString());
        return ids;
      });
  
      let idsU = messagesUserId.filter((id) => id !== user._id.toString());
      const ids = [...new Set(idsU)];
  
      return res.status(200).json(ids);
    } catch (error) {
      console.log("Erro no sendMessage", error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  };