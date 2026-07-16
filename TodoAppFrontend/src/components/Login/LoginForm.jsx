import "./LoginForm.css"
import { useState } from "react"

export const LoginForm = ({setActiveModal}) => {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        e.preventDefault()
        setLoginForm(prev =>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }    

    const handleSend = async() => {
        const response = await fetch("http://localhost:3000/users/login",{
            method: "POST",
            credentials: "include",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginForm)
        })
        if(!response.ok) throw new Error("didnt work.")
        
        return await response.json()
    }

    return(
        <div className="loginModal">
            <div onClick={() => {setActiveModal("")}} >X</div>
            <form className="loginForm">
                <label htmlFor="emailInput">Email</label>
                <input type="text" id="emailInput"  name="email" onChange={handleChange} value={loginForm.email}></input>
                <label htmlFor="passwordInput">Password</label>
                <input type="text"  name="password" onChange={handleChange} value={loginForm.password}></input>
                <input type="button" onClick={()=> {handleSend()}} value="login"></input>
            </form>
        </div>
    )
}