import express from "express"
import router from "./routes/index.routes.js"
import cors from "cors"

const app = express()

app.use(
    cors({origin: "http://localhost:5173"}),
    express.json(),
    express.urlencoded({extended: true})
)

app.use("/", router)

app.use((req, res,)=>{
    res.status(404).json({
        error:{
            code: "INVALID_ROUTE",
            message: "Route not found."
        }
    })
})

app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).json({
        error:{
            code:"INTERNAL_ERROR",
            message:"Internal server error."
        }
    })
})

export default app