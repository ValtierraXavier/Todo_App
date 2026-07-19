import "./LoginForm.css"
import { useState } from "react"
import { userLogin } from "../../services/user.service.js"

export const LoginForm = ({setActiveModal, setCurrentUser}) => {
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
        const login = await userLogin(loginForm)
        // setActiveModal("")
        setCurrentUser(login.user)
    }

    return(
        <div className="loginModal">
            <>Log In</>
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