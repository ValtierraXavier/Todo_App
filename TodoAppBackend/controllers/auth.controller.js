import pool from "../server.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const getUserById = async (req, res) => {
    const userId = req.user.user_id
    const response = await pool.query(
        `
            SELECT 
                * 
            FROM 
                users
            WHERE 
                id = $1
        `,
        [id]
    )        
    res.status(200).json(response.rows[0])
}

//email checked for existence at this point. create JWT and send to user. 

export const userLogin = async (req, res) => {
    const response = pool.query(
        `
            SELECT user_id, email, hash
            FROM users
            WHERE email = $1
        `,
        [req.body.email]
    )

    const user = response.rows[0]

    if(!user){
       return res.status(401).json({
            error:{
                code: "INVALID_CREDENTIALS",
                message: "Invalid email or password."
            }
        })
    }
    
    const match = bcrypt.compare(
        req.body.password,
        user.password_hash
    )

    if(!match){
       return res.status(401).json({
            error: {
                code: "INVALID_CREDENTIALS",
                message: "Invalid email or password."
            }
        })
    }

    const token = jwt.sign(
        {
            user_id: user.user_id,
            email: user.email
        },
        process.env.secret,
        {
            expiresIn: "1h"
        }
    )

    res.status(200).json(token)    
}


//informationg verified before contoller.(duplcate email check. proper email formatting. )

export const createNewUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const hash = await bcrypt.hash(password, 10)

    const response = await pool.query(
        `
            INSERT INTO users
                (email, password_hash)
            VALUES 
                ($1, $2)
            RETURNING 
                user_id,
                email,
                created
        `,
        [email, hash]
    )

    const userToken = jwt.sign(response.rows[0], process.env.secret)
    
    res.status(201).json(userToken)
}

export const userLogout = async (req, res) => {


}

export const deleteUser = async (req, res) => {
    const id = req.user.id
    const email = req.user.email
    
    const response = pool.query(
        `
            DELETE FROM
                users
            WHERE
                id = $1
            AND 
                email = $2
            RETURNING 
                *
        `,
        [req.body.id, req,body.email]
    )
    res.send(200).send("User has been deleted.")
}