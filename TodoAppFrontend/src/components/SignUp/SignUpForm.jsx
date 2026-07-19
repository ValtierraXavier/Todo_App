import { userSignup } from "../../services/user.service";
import "./SignUpForm.css"
import {useState} from 'react'

export const SignUpForm = ({setActiveModal, setCurrentUser}) => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        setForm(prev =>({...prev, [name]: value}))
    }
    const handleSend = async () => {
        const signup = await userSignup(form)
        // setActiveModal("")
        setCurrentUser(signup)
    }

    return(
        <div className="SIForm">
            <>SignUp</>
            <form>
                <label htmlFor="emailInput">Email</label>
                <input type="text" id="emailInput"  name="email" onChange={handleChange} value={form.email}></input>
                <label htmlFor="passwordInput">Password</label>
                <input type="text"  name="password" onChange={handleChange} value={form.password}></input>
                <input type="button" onClick={handleSend} value="Sign Up!"></input>
            </form>
        </div>
    )
}