import jwt from "jsonwebtoken"
import User from "../model/user.model.js"


export const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Token não encontrado. Acesso negado." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        req.user = user; 
        next();
    } catch (error) {
        console.log("Erro na verificação do usuário:", error);
        return res.status(401).json({ message: "Token inválido ou expirado." });
    }
};