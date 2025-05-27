import express from "express"
import { verifyUser } from "../middleware/auth.middleware.js"
import {sendMessage, getMessage, getAllMenssages} from "../controllers/message.controller.js"
const router = express.Router()

router.post("/send/:id", verifyUser, sendMessage)
router.get("/message/:id",verifyUser, getMessage)
router.get("/allmessages", verifyUser, getAllMenssages)

export default router
