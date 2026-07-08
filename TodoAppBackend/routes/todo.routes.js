import Router from "express"
import * as todoController from "../controllers/todo.contoller.js"

const router = Router()

router.get("/", todoController.getAllTodos)
router.get("/:id", todoController.getTodoById)
router.post("/", todoController.createTodo)
router.put("/:id", todoController.updateTodo)
router.put("/complete/:id", todoController.completeTodo)
router.delete("/:id", todoController.deleteTodo)

export default router