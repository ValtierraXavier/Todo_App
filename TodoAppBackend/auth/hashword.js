import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const saltRounds = 10
const secretString = "This_is_a_super_secret_string!"
const input = "this is an input!?"
const falseInput = "this is an input!"

const hash = await bcrypt.hash(input, saltRounds)

const real = await bcrypt.compare(input, hash)
const fake = await bcrypt.compare(falseInput, hash)

// console.log(`real: ${real}, fake: ${fake}`)

const newToken = jwt.sign(hash, secretString)

jwt.verify(newToken, "secretString", (err, ver)=>{
        if(err){
            console.log(err)
        }else{
            console.log(`Hashed Password: ${hash}\n\nJWT: ${newToken}\n\n verification: ${ver}`)
        }
   
})

//play with expires at. and make sure it is working. VERY IMPORTANT FOR SECURITY.
//Once working implement into backend logic.

/*
    User creates a profile:
        user sends: body {
            username, Password
        }
        server recives from route "/create": 
            req.body
            hash = await bcrypt.hash(body.password, salt)
           
           save username/email and hash table auto-fills id, created_at, and complete to default values. 
    user sends credentials:
        user sends body{username, password}
        const key = bcrypt(password, salt)
        const scepter = (select password from users where username = body.username).rows
        if key === scepter
            const token = jwt.sign(key, process.env.supersecret)
        res.send(201).json(token)
*/