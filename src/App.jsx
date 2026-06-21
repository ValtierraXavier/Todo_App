import './App.css'
import { useState } from "react"
import { TodoItem } from "./components/TodoItem.jsx"
import { completeTodo } from "./assets/local.storage.jsx"

function App () {

  const [todos, setTodos] = useState([])

  const [todo, setTodo] = useState({
    id:"",
    item: "",
    description: "",
    complete: false,
    created: ""
  })

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if(editingId){
      setEditingId(false)
      const newTodo = {...todo}
      setTodos(prev => 
        prev.map(oldTodo => 
          oldTodo.id === editingId
          ? newTodo
          : oldTodo))
      setEditingId(null)
    }

    if(!editingId){
      const currentTodo = {
        ...todo,
        id: crypto.randomUUID(),
        created: new Date().toLocaleDateString()
      }
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
  
  const prepEdit = (id) => {
    setEditingId(true)
    const oldTodo = todos.find(todo =>
       todo.id === id
      )
    setTodo({...oldTodo})
    setEditingId(id)
  }

  const handleDelete = (id) => {
    const notDeleted = todos.filter(todo => todo.id !== id) 
    setTodos(notDeleted)
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="App Title" >Todo App</h1>

        <label htmlFor="itemInput">Item</label>
        <input 
          className="addInput" 
          id = "itemInput" type="text" 
          placeholder="Item" 
          name="item" 
          onChange={handleChange} 
          value={todo.item}
        />

        <label htmlFor="descriptionInput">Description</label>
        <textarea 
          className="addInput" 
          id = "descriptionInput" 
          type="text" 
          placeholder="Description" 
          name='description' 
          onChange={handleChange} 
          value = {todo.description}
        />

        <button 
          type="submit" 
          className="addInput" 
          id="submitButton"
        >
          {`${editingId? "Save Edits": "Add Todo"}`}
        </button>
      </form>
      {todos.map((el)=>{
        return(
            <TodoItem 
              key={el.id} 
              data={el} 
              handleComplete={handleComplete} 
              prepEdit={prepEdit} 
              editingId={editingId}
              handleDelete={handleDelete}
            />
        )
      })}
    </>
  )
}

export default App
