import "./SignUpForm.css"
import {useState} from 'react'

export const SignUpForm = ({setActiveModal}) => {
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
        const response = await fetch("http://localhost:3000/users/new",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        if(!response.ok) throw new Error("didnt work.")
    }

    return(
        <div className="SIForm">
            <div onClick={() => {setActiveModal("")}} >X</div>
            <form>
                <label htmlFor="emailInput">Email</label>
                <input type="text" id="emailInput"  name="email" onChange={handleChange} value={form.email}></input>
                <label htmlFor="passwordInput">Password</label>
                <input type="text"  name="password" onChange={handleChange} value={form.password}></input>
                <input type="button" onClick={handleSend} value="send"></input>
            </form>
        </div>
    )
}