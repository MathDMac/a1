import express from "express"
import { verifyUser } from "../middleware/auth.middleware.js"
import {addContacts,getUsers,updateProfilePic} from "../controllers/user.controller.js"
const router = express.Router()


router.post("/addcontacts/:id",verifyUser, addContacts)


router.get("/users", verifyUser, getUsers)
router.put("/updateprofilepic",verifyUser, updateProfilePic)


export default router 