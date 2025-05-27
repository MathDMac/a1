import express from "express"
import http from "http"
import { Server} from "socket.io"
import cookieParser from "cookie-parser"
import cors from "cors"
import { config} from "dotenv"
import path from "path"

import { connectDB } from "./src/utils/db.js"

import authRoute from "./src/route/auth.route.js"
import userRoute from "./src/route/user.route.js"
import messageRoute from "./src/route/message.route.js"

const mapUserSockets = {}

config()
const app = express()

const server = http.createServer(app)

const io = new Server(server, {cors:{origin:["http://localhost:5173"], credentials:true}})

const __dirname = path.resolve()

const PORT = process.env.PORT || 5173

app.use(express.json({limit:"30mb"}))
app.use(cors({origin: "http://localhost:5173", credentials:true}))
app.use(cookieParser())


app.use("/messages", messageRoute)
app.use("/auth", authRoute)
app.use("/users",userRoute)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

server.listen(PORT, async()=>{
    await connectDB()
})

export function getSocketId(userId){
    return mapUserSockets[userId]
}

io.on("connection", (socket)=>{
    const userId = socket.handshake.query.userId

    if (userId) mapUserSockets[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(mapUserSockets))

    socket.on("disconnect", ()=>{
        console.log("A user disconnected", socket.id);
        delete mapUserSockets[userId]
        io.emit("getOnlineUsers", Object.keys(mapUserSockets));
    })
})

export {io}

