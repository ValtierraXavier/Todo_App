//event shape
// {
//     id: String,
//     item: String,
//     description: String,
//     created: String,
//     dueDate: String
//     complete: Boolean
// }

export  const getTodo = (id) => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    const item = todos.find(e => e.id === id)

    return item? item: null
}

export const getAllTodos = () => {
    return JSON.parse(localStorage.getItem("todos")) || []
}


export const addTodo = (todo) => {
    const todos = JSON.parse(localStorage.getItem("todos")) || []
    localStorage.setItem(
        "todos", JSON.stringify([...todos, todo], null, 2)
    )
    return todo
}

export  const editTodo = (id, edit) => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    const edited = todos.map(todo => todo.id === id? edit: todo)
    localStorage.setItem("todos", JSON.stringify(edited))
}


export const removeTodo = (id) => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    const index = todos.findIndex(e => e.id === id)
    if(index < 0){
        return null
    }
    const [item] = todos.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(todos))

    return item
}

export const completeTodo = (id) => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    .map(todo => todo.id === id? {...todo, complete: true}: todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}