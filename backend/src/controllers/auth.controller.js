import bcrypt from "bcrypt"
import { madeToken } from "../utils/token_made.js"
import User from "../model/user.model.js"


export const userSignup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Requisitos não atendidos, preencha todos os campos" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Senha fraca, precisa ter mais de 6 caracteres" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "E-mail já cadastrado" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        await newUser.save();
        madeToken(newUser._id, res);

        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email
        });

    } catch (error) {
        console.log("Erro no signup:", error);
        return res.status(500).json({ message: "Erro no servidor" });
    }
};

export const userLoggingIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Erro na identificação, e-mail ou senha inválidos" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ message: "Senha incorreta" });
        }

        madeToken(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            contacts: user.contacts
        });

    } catch (error) {
        console.log("Erro no login:", error);
        return res.status(500).json({ message: "Erro no servidor" });
    }
};

export const userLoggingOut = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logout com sucesso" });

    } catch (error) {
        console.log("Erro no logout:", error);
        return res.status(500).json({ message: "Erro no servidor" });
    }
};

export const userCheckIn = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json(user);
    } catch (error) {
        console.log("Erro no checkin:", error);
        return res.status(500).json({ message: "Erro no servidor" });
    }
};