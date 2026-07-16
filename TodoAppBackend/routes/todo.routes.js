import Router from "express"
import * as todoController from "../controllers/todo.contoller.js"
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router()

router.get("/", requireAuth, todoController.getAllTodos)
router.get("/:id", requireAuth, todoController.getTodoById)
router.post("/", requireAuth, todoController.createTodo)
router.put("/", requireAuth, todoController.updateTodo)
router.put("/complete/:id", requireAuth, todoController.completeTodo)
router.delete("/", requireAuth, todoController.deleteTodo)

export default router