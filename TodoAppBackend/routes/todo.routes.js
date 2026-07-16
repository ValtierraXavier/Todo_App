import Router from "express"
import * as todoController from "../controllers/todo.contoller.js"
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router()

router.get("/", requireAuth, todoController.getAllTodos)
router.get("/", requireAuth, todoController.getTodoById)
router.post("/", requireAuth, todoController.addTodo)
router.put("/", requireAuth, todoController.updateTodo)
router.put("/complete", requireAuth, todoController.completeTodo)
router.delete("/", requireAuth, todoController.deleteTodo)

export default router