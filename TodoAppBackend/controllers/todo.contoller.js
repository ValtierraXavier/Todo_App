import fs from "node:fs/promises"
import path from "node:path"

const storagePath = path.join(process.cwd(),"tempStorage.json")

export const getAllTodos = async (req, res) => {
    const file = await fs.readFile(storagePath, "utf8")
    const todos = JSON.parse(file)
    res.status(200).json(todos)
}

export const getTodoById = async (req, res) => {
    const id = req.params.id
    const todos = JSON.parse(await fs.readFile(storagePath))
    res.status(200).json(todos.find(todo => id === todo.id))
}
export const createTodo = async (req, res) => {
    const todo = req.body
    const todos = JSON.parse(await fs.readFile(storagePath))
    fs.writeFile(storagePath, JSON.stringify([...todos, todo], null, 2))
    res.status(200).json(todo)
}

export const updateTodo = async (req, res) => {
    const id = req.params.id
    const edits = req.body
    const todos = JSON.parse(await fs.readFile(storagePath))
    const index = todos.findIndex(todo => todo.id === id)
    if(index < 0)(
        res.status(400).json({
            error:{
                code: "INVALID_ID",
                message: "todo not found."
            }
        })
    )
    todos[index] = edits
    await fs.writeFile(storagePath, JSON.stringify(todos, null, 2))
    res.status(200).json(todos[index])
}
    

export const deleteTodo = async (req, res) => {
    const id = req.params.id
    const todos = JSON.parse(await fs.readFile(storagePath))
    const index = todos.findIndex(todo => id === todo.id)

    if(index < 0) return null

    const [todo] = todos.splice(index, 1)
    await fs.writeFile(storagePath, JSON.stringify(todos, null, 2))
    res.status(200).json(todo)
}

export const completeTodo = async (req, res) => {
    const id = req.params.id
    const todos = JSON.parse(await fs.readFile(storagePath))
    const index = todos.findIndex(todo => id === todo.id)

    if(index < 0) return null

    todos[index] = {...todos[index], complete: true}
    await fs.writeFile(storagePath, JSON.stringify(todos, null, 2))
    res.status(200).json(todos[index])
}