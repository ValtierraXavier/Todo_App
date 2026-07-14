import { Router } from "express"
import todoRoutes from "./todo.routes.js"
import userRoutes from "./auth.routes.js"

const router = Router()

router.use("/todos", todoRoutes)
router.use("/users", userRoutes)

export default router