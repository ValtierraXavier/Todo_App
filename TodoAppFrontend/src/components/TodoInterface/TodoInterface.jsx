import { useEffect, useState } from "react"
import { addTodo, completeTodo, removeTodo, editTodo, getAllTodos } from "../../services/todo.service.js"
import { userLogout} from "../..//services/user.service.js"
import { TodosList } from "../../components/TodosList/TodosList.jsx"
import { AddTodoForm } from "../../components/AddTodoForm/AddTodoForm.jsx"
import { AddTodoButton } from "../../components/AddTodoButton/AddTodoButton.jsx"

export const TodoInterface = ({setCurrentUser}) => {

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

  useEffect(()=> {
    const loadTodos = async () => {
      const loaded = await getAllTodos()
      setTodos(loaded)
    }
    loadTodos()
  },[])

  const handleChange = (e) => {
    setTodo(prev => (
      {...prev, [e.target.name]: e.target.value}
    ))
  }

  const resetState = (state, setState) => {
    const obj = {...state}

    const keys = Object.keys(obj)
    for(const key of keys){
      obj[key] = ""
    }
    setState(obj)
    return
  }

  const prepEdit = (id) => {
    const oldTodo = todos.find(todo =>
       todo.id === id
      )
    setTodo({...oldTodo})
    setEditingId(id)
    setActiveModal("addTodo")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(editingId){
      const newTodo = {...todo}
      await editTodo(editingId, newTodo)
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
      }
      await addTodo(currentTodo)

      setTodos(prev => 
        [...prev, currentTodo]
      )


    }
    resetState(todo, setTodo)
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

  const handleDelete = async (id) => {
    const deleted = await removeTodo(id)
    if(!deleted){
      console.log("could not delete todo.")
      return
    }
    const filtered = todos.filter(el => el.id !== deleted.id)
    setTodos(filtered)
  }
  
  const toggleAddForm = (command) => {
    if(command === "open"){
      setActiveModal("addTodo")
    }
    if(command === "close"){
      setActiveModal("")
      setEditingId(null)
      setTodo({
        id:"",
        item: "",
        description: "",
        complete: false,
        created: ""
      })
    }
    return
  }

  const handleLogout = () => {
    setCurrentUser(null)
    userLogout()
  }

    return(
      <div className="todoInterface">
        <nav className="navBar">
            <input type="button" className="logoutBUutton" name="logOut" value="Log out" onClick={handleLogout}/>
        </nav>
        
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