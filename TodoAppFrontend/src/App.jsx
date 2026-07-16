import './App.css'
import { useEffect, useState } from "react"
import { addTodo, completeTodo, getAllTodos, removeTodo, editTodo } from "./services/storage.service.js"
import { TodosList } from "./components/TodosList/TodosList.jsx"
import { AddTodoForm } from "./components/AddTodoForm/AddTodoForm.jsx"
import { AddTodoButton } from "./components/AddTodoButton/AddTodoButton.jsx"
import { SignUpForm} from "./components/SignUp/SignUpForm.jsx"
import { LoginForm } from './components/Login/LoginForm.jsx';

function App () {
  const [todos, setTodos] = useState([])

  const [todo, setTodo] = useState({
    id:"",
    item: "",
    description: "",
    complete: false,
    created: ""
  })

  const [activeModal, setActiveModal] = useState('')

  const [editingId, setEditingId] = useState(false)


  useEffect(() => {
    const loadTodos = async () => {
      const data = await getAllTodos()
      setTodos(Array.isArray(data)? data: [])
    }
    loadTodos()
  }, [])

  const handleChange = (e) => {
    setTodo(prev => (
      {...prev, [e.target.name]: e.target.value}
    ))
  }

  const resetTodo = () => {
    setTodo({
      id:"",
      item: "",
      description: "",
      complete: false,
      created: ""
    })
  }

  const prepEdit = (id) => {
    const oldTodo = todos.find(todo =>
       todo.id === id
      )
    setTodo({...oldTodo})
    setEditingId(id)
    setActiveModal("addTodo")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(editingId){
      const newTodo = {...todo}
      editTodo(editingId, newTodo)
      setTodos(prev => 
        prev.map(oldTodo => 
          oldTodo.id === editingId
          ? newTodo
          : oldTodo)
        )
      setEditingId(null)
    }

    if(!editingId){
      const currentTodo = {
        ...todo,
        id: crypto.randomUUID(),
        created: new Date().toLocaleDateString()
      }
      addTodo(currentTodo)
      setTodos(prev => 
        [...prev, currentTodo]
      )


    }
    resetTodo()
    setActiveModal("")
  }

  const handleComplete = (id) => {
        completeTodo(id)
        setTodos(prev => 
          prev.map(el => 
            el.id === id
              ?{...el, complete: true}
              :el
        ))
    }

  const handleDelete = (id) => {
    const notDeleted = todos.filter(todo => todo.id !== id) 
    setTodos(notDeleted)
    removeTodo(id)
  }
  
  const toggleAddForm = (command) => {
    if(command === "open"){
      setActiveModal("addTodo")
    }
    if(command === "close"){
      setActiveModal("")
      setEditingId(null)
      resetTodo()
    }
    return
  }

  return (
    <div className="todoApp">
      <nav className="navBar">
        <input type="button" className="signupButton" name="signUp" value="Sign Up" onClick={(e)=>{setActiveModal(e.target.name)}} />
        <input type="button" className="loginButton" name="logIn" value="Log In" onClick={(e)=>{setActiveModal(e.target.name)}} />
      </nav>
      {activeModal === "signUp" &&
        <SignUpForm setActiveModal = {setActiveModal}/>
      }
      {activeModal === "logIn" &&
        <LoginForm setActiveModal = {setActiveModal}/>
      }
      {
        activeModal === "addTodo" &&
        <AddTodoForm 
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingId={editingId} 
          todo={todo}
          toggleAddForm = {toggleAddForm}
        />
      }
      <h1 className="appTitle">Todo App</h1>
      {activeModal === "addTodo" || <AddTodoButton className="AddTodoButton" setActiveModal={setActiveModal}/>}
      
      <TodosList 
        listItems={todos}
        handleComplete={handleComplete} 
        prepEdit={prepEdit} 
        editingId={editingId}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App