import jwt from "jsonwebtoken"

export const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization 
    if(!authHeader?.startsWith("Bearer ")){
        return res.status(401).json(
            {
                error:{
                    code: "AUTHORIZATION_REQUIRED",
                    message: "Auhorization is required for access."
                }
            }
        )
    }
    const token = authHeader.split(" ")[1]

    try{
        const payload = jwt.verify(token, process.env.secret)

        req.user = payload

        next()
    }catch(err){
        res.send(401).json(
            {
                error: {
                    code: "INVALID_TOKEN",
                    message: "Token is invalid or has expired."
                }
            }
        )
    }
}