import express from "express"
import {verifyUser} from "../middleware/auth.middleware.js"
import {userCheckIn, userLoggingIn, userLoggingOut, userSignup} from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/login", userLoggingIn)
router.post("/signup", userSignup)
router.post("/logout", verifyUser, userLoggingOut)
router.get("/checkUser", verifyUser, userCheckIn)


export default router