//event shape
// {
//     id: String,
//     item: String,
//     description: String,
//     created: String,
//     dueDate: String
//     complete: Boolean
// }

const backEndUrl = "http://localhost:3000/todos"

export  const getTodo = async (id) => {
    const response = await fetch(`${backEndUrl}/${id}`)
    if(!response.ok){
        throw new Error(`unable to find todo.(${response.status})`)
    }
    return await response.json()
}

export const getAllTodos = async () => {
    const response = await fetch(backEndUrl)
    if(!response){
        throw new Error(`Response status: ${response.status}`)
    }
    
    return await response.json()
}


export const addTodo = async (todo) => {
    console.log(todo)
    const response = await fetch(backEndUrl,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
    if(!response.ok){
        throw new Error(`Todo not created. Status:${response.status}`)
    }
    
    return await response.json()
}

export  const editTodo = async (id, edit) => {
    const req = await fetch(`${backEndUrl}/${id}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(edit)        
    })
    if(!req.ok) throw new Error(`Could not edit todo. Status:${req.status}`)
    
    return await req.json()
}


export const removeTodo = async (id) => {
    const response = await fetch(`${backEndUrl}/${id}`, {
        method: "DELETE"
    })
    if(!response.ok){
        throw new Error(`Could not delete todo. Status:${response.status}`)
    }

    return await response.json()
}

export const completeTodo = async (id) => {
    const response = await fetch(`${backEndUrl}/complete/${id}`, {
        method: "PUT"
    })
    if(!response.ok){
        throw new Error(`Could not complete todo. Status:${response.status}`)
    }
    return await response.json()
}