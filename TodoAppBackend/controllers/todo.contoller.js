import fs from "node:fs/promises"
import path from "node:path"
import { pool } from "../server.js"

// const storagePath = path.join(process.cwd(),"tempStorage.json")

export const getAllTodos = async (req, res) => {
    // const file = await fs.readFile(storagePath, "utf8")
    // const todos = JSON.parse(file)
    // res.status(200).json(todos)
    try{
        const result = await pool.query(`
            SELECT * FROM
                todos 
            ORDER BY 
                created ASC
            ;   
        `)
        const todos = result.rows
        res.status(200).json(todos)
    }catch(e){console.log(e.message)}
}

export const getTodoById = async (req, res) => {
    // const todos = JSON.parse(await fs.readFile(storagePath))
    // res.status(200).json(todos.find(todo => id === todo.id))
    const response = await pool.query(`
            SELECT * FROM
                todos
            WHERE 
                id = $1
        `,[req.user.user_id]
)
    const todo = response.rows
    res.status(200).json(todo)
}
export const createTodo = async (req, res) => {
    // const todos = JSON.parse(await fs.readFile(storagePath))
    // fs.writeFile(storagePath, JSON.stringify([...todos, todo], null, 2))
    const response = await pool.query(`
            INSERT INTO todos
                (item, description)
            values
                ($1, $2)
            WHERE 
                user_id = $3
            RETURNING *
        `,
        [req.body.item, req.body.description, req.user.user_id]
    )
    res.status(200).json(response.rows[0])
}

export const updateTodo = async (req, res) => {
    // const todos = JSON.parse(await fs.readFile(storagePath))
    // const index = todos.findIndex(todo => todo.id === id)
    // if(index < 0)(
    //     res.status(400).json({
    //         error:{
    //             code: "INVALID_ID",
    //             message: "todo not found."
    //         }
    //     })
    // )
    // todos[index] = edits
    // await fs.writeFile(storagePath, JSON.stringify(todos, null, 2))
    const response = await pool.query(`
        UPDATE todos
        SET 
            item = $1,
            description = $2
        WHERE 
            id = $3
        RETURNING *
    `,
        [req.body.item, req.body.description, req.user.user_id]
    )
    res.status(200).json(response.rows[0])
}
    

export const deleteTodo = async (req, res) => {
    // const todos = JSON.parse(await fs.readFile(storagePath))
    // const index = todos.findIndex(todo => id === todo.id)

    // if(index < 0) return null

    // const [todo] = todos.splice(index, 1)
    // await fs.writeFile(storagePath, JSON.stringify(todos, null, 2))

    await pool.query(
        `
            DELETE FROM
                todos
            WHERE 
                id = $1
            AND
                user_id = $2
        `,
        [req.body.id, req.user.user_id]
    )
    res.status(200)
}

export const completeTodo = async (req, res) => {
    // const todos = JSON.parse(await fs.readFile(storagePath))
    // const index = todos.findIndex(todo => id === todo.id)

    // if(index < 0) return null

    // todos[index] = {...todos[index], complete: true}
    // await fs.writeFile(storagePath, JSON.stringify(todos, null, 2))

    const response = await pool.query(
        `
            UPDATE 
                todos
            SET
                complete = TRUE
            WHERE
                id = $1
            RETURNING *
        `,
        [req.body.id, req.user.user_id]
    )
    res.status(200).json(response.rows[0])
}