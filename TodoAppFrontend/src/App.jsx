import './App.css'
import { useEffect, useState } from "react"
import { checkUser } from "./services/user.service.js"

import { TodoInterface } from "./components/TodoInterface/TodoInterface.jsx"
import { SignUpForm} from "./components/SignUp/SignUpForm.jsx"
import { LoginForm } from './components/Login/LoginForm.jsx';

function App () {
/*
  State below will be moved elsewhere(eventually) it needs userAuthenticated and an authLoading state
  authLoading{defualt: true} => becomes false after the server has responded. at which point 
  userAuthenticated{defualt: false} => will remain false if the response contained no user object. or true if it did. at which point
  conditional rendering will either mount the landing page or the todoApp. with acces to backend using users credentials. 
*/

  const [authLoading, setAuthLoading] = useState(true)

  const [currentUser, setCurrentUser] = useState(null)

  const [activeModal, setActiveModal] = useState('signUp')

  /*
  this needs to return a landing page(signUp form, login button) or the todo app(as it currently is) depending on whether
  the userAuthenticated is null or not.
  that way user is directed to the landing page. and is not presented with a blank todoApp page.
  */

  useEffect(() => {
    const initCheck = async () => {
      const user = await checkUser()
      setAuthLoading(false)
      setCurrentUser(user)
    }
    initCheck()    
    }, [])
    
  return (
    <div className="todoApp">
      
      {
        authLoading
        ?<div className="loadingScreen">Loading...</div>
          :!currentUser
            ?<div className="credentialInput">
                {activeModal === "signUp" && 
                  <>
                    <input type="button" className="loginButton" name="logIn" value="Log In" onClick={(e)=>{setActiveModal(e.target.name)}} />
                    <SignUpForm setActiveModal = {setActiveModal} setCurrentUser={setCurrentUser}/>
                  </>
                }
                {activeModal === "logIn" &&
                <>
                  <input type="button" className="signupButton" name="signUp" value="Sign Up" onClick={(e)=>{setActiveModal(e.target.name)}} />
                  <LoginForm setActiveModal = {setActiveModal} setCurrentUser={setCurrentUser}/>
                </>
                }
            </div>
            :<TodoInterface setCurrentUser={setCurrentUser} currentUser={currentUser}/>
      }
    </div>

    // {
    //  work on this after breakfast

    //   authLoading? <div>"loading"</div>: currentUser? <TodoApp/>: <landing/>
    // }

    // <div className="todoApp">
    //   <nav className="navBar">
    //     <input type="button" className="signupButton" name="signUp" value="Sign Up" onClick={(e)=>{setActiveModal(e.target.name)}} />
    //     <input type="button" className="loginButton" name="logIn" value="Log In" onClick={(e)=>{setActiveModal(e.target.name)}} />
    //     <input type="button" className="logoutBUutton" name="logOut" value="Log out" onClick={handleLogout}/>
    //   </nav>
    //   {activeModal === "signUp" &&
    //     <SignUpForm setActiveModal = {setActiveModal} resetState={resetState} setCurrentUser={setCurrentUser}/>
    //   }
    //   {activeModal === "logIn" &&
    //     <LoginForm setActiveModal = {setActiveModal} resetState={resetState} setCurrentUser={setCurrentUser}/>
    //   }
    //   {
    //     activeModal === "addTodo" &&
    //     <AddTodoForm 
    //       handleChange={handleChange}
    //       handleSubmit={handleSubmit}
    //       editingId={editingId} 
    //       todo={todo}
    //       toggleAddForm = {toggleAddForm}
    //     />
    //   }
    //   <h1 className="appTitle">Todo App</h1>
    //   {activeModal === "addTodo" || <AddTodoButton className="AddTodoButton" setActiveModal={setActiveModal}/>}
      
    //   <TodosList 
    //     listItems={todos}
    //     handleComplete={handleComplete} 
    //     prepEdit={prepEdit} 
    //     editingId={editingId}
    //     handleDelete={handleDelete}
    //   />
    // </div>
  )
}

export default App