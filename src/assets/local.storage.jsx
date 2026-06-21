//event shape
// {
//     id: String,
//     item: String,
//     description: String,
//     created: String,
//     dueDate: String
//     complete: Boolean
// }

const todoStorage = []

export const addTodo = (event) => {
    todoStorage.push(event)
    return event
}
export const removeTodo = (id) => {
    const index = todoStorage.findIndex(e => e.id === id)
    if(index < 0){
        return null
    }
    const [item] = todoStorage.splice(index, 1)

    return item
}

export  const seeTodoDetails = (id) => {
    const item = todoStorage.find(e => e.id === id)

    return item? item: null
}

export const viewTodos = () => {
    return [...todoStorage]
}

export const completeTodo = (id) => {
    todoStorage.map(todo => {if(todo.id === id) return {...todo, complete: true}})
}

export  const editTodo = (id, edit) => {
    const edited = {...todoStorage.find(todo => todo.id === id), edit}

//only pass complete, item and details
}