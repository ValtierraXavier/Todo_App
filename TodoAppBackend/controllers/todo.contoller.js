import { pool } from "../server.js"

// const storagePath = path.join(process.cwd(),"tempStorage.json")

export const getAllTodos = async (req, res) => {
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
    const response = await pool.query(`
            SELECT * FROM
                todos
            WHERE 
                id = $1
        `,[req.body.id]
)
    const todo = response.rows
    res.status(200).json(todo)
}
export const addTodo = async (req, res) => {
    const response = await pool.query(`
            INSERT INTO todos
                (item, description, user_id)
            values
                ($1, $2, $3)
            RETURNING *
        `,
        [req.body.item, req.body.description, req.user.user_id]
    )
    res.status(200).json(response.rows[0])
}

export const updateTodo = async (req, res) => {
    const response = await pool.query(`
        UPDATE todos
        SET 
            item = $1,
            description = $2
        WHERE 
            id = $3
        AND
            user_id = $4
        RETURNING *
    `,
        [req.body.item, req.body.description, req.body.id, req.user.user_id]
    )
    res.status(200).json(response.rows[0])
}
    

export const deleteTodo = async (req, res) => {
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
    const response = await pool.query(
        `
            UPDATE 
                todos
            SET
                complete = true
            WHERE
                id = $1
            AND
                user_id = $2
            RETURNING *
        `,
        [req.body.id, req.user.user_id]
    )
    res.status(200).json(response.rows[0])
}