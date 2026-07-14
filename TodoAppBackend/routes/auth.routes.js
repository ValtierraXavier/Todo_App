import Router from "express"
import * as userController from "../controllers/auth.controller.js"
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router()

router.get("/me", requireAuth, userController.getUserById)
router.post("/login", userController.userLogin)
router.post("/new", userController.createNewUser)
router.post("/logout", userController.userLogout)
router.delete("/delete", requireAuth, userController.deleteUser)

export default router