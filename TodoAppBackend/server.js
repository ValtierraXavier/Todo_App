import  app from "./app.js"
import {Pool} from 'pg'

export const pool = new Pool({
    host: "localhost",
    port: 5432,
    database: "playground",
    user: "xaviervaltierra",
    password: "Catch-22"
})

// const result  = await pool.query(`SELECT * from todos;`)
// console.log(result.rows)

// pool.end()

const port  = 3000

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})

