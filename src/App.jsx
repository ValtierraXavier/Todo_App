import './App.css'
import { useState } from "react"
import { addTodo, completeTodo, getAllTodos, removeTodo, editTodo } from "./services/storage.service.jsx"
import { TodosList } from "./components/TodosList.jsx"
import { AddTodoForm } from "./components/AddTodoForm.jsx"

function App () {

  const [todos, setTodos] = useState([...getAllTodos()])

  const [todo, setTodo] = useState({
    id:"",
    item: "",
    description: "",
    complete: false,
    created: ""
  })

  const [addFormOpen, setAddFormOpen] = useState(false)

  const [editingId, setEditingId] = useState(false)

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
    setEditingId(true)
    const oldTodo = todos.find(todo =>
       todo.id === id
      )
    setTodo({...oldTodo})
    setEditingId(id)
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
      setAddFormOpen(true)
    }
    if(command === "close"){
      setAddFormOpen(false)
    }
    return
  }


  return (
    <>
      <h1 className="App Title">Todo App</h1>
      {addFormOpen || <button className="addFormOpenButton" onClick={()=>{toggleAddForm("open")}}>Add Todo</button>}
      {
        addFormOpen &&
        <AddTodoForm 
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingId={editingId} 
          todo={todo}
          toggleAddForm = {toggleAddForm}
        />
      }
      <TodosList 
        listItems={todos}
        handleComplete={handleComplete} 
        prepEdit={prepEdit} 
        editingId={editingId}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default App