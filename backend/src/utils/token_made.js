import jwt from "jsonwebtoken";

export const madeToken = (id, res)=>{
    const jwtToken = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'7d'})
    res.cookie("jwt", jwtToken,{        
        maxAge: 7*24*60*1000,
        httpOnly:true,
        sameSite:'strict'})

    return jwtToken
}


