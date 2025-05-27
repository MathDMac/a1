import {v2 as cloudinary} from "cloudinary"
import User from "../model/user.model.js"

export const getContacts = async (req, res) => {
    try {
        const user = req.user;
        const contacts = await User.find({ _id: { $in: user.contacts } }).select("-password");
        return res.status(200).json({ contacts });
    } catch (error) {
        console.log("Erro no getContacts:", error);
        return res.status(500).json({ message: "Erro no servidor" });
    }
};

export const addContacts = async (req, res) => {
    try {
        const user = req.user;
        const { id: receiverId } = req.params;

        if (user.contacts.includes(receiverId)) {
            return res.status(400).json({ message: "Usuário já está nos seus contatos." });
        }

        user.contacts.push(receiverId);
        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.log("Erro no addContacts:", error);
        return res.status(500).json({ message: "Erro no servidor" });
    }
};


export const updateProfilePic = async (req, res) => {
    try {
        const { profilePic } = req.body;
        
        const uploadedImage = await cloudinary.uploader.upload(profilePic);
        const imageUser = uploadedImage.secure_url;

        const userUpdate = await User.findByIdAndUpdate(
            req.user._id,
            { $set: { profilePic: imageUser } }, 
            { new: true }
        ).select("-password");

        return res.status(200).json(userUpdate);
    } catch (error) {
        console.log("Erro no updateProfilePic:", error);
        return res.status(500).json({ message: "Erro no servidor" });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log("Erro no getUsers:", error);
        return res.status(500).json({ message: "Erro no servidor" });
    }
};