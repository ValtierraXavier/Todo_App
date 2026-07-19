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
    const response = await fetch(`${backEndUrl}/${id}`,{
        method: "GET",
        credentials: "include"
    })
    if(!response.ok){
        throw new Error(`unable to find todo.(${response.status})`)
    }
    return await response.json()
}

export const getAllTodos = async () => {
    const response = await fetch(backEndUrl,{
        method: "GET",
        credentials: "include"
    })
    if(!response){
        throw new Error(`Response status: ${response.status}`)
    }

    return await response.json()
}

export const addTodo = async (todo) => {
    const response = await fetch(backEndUrl,{
        method: "POST",
        credentials: "include",
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
        const request = await fetch(`${backEndUrl}/${id}`, {
        method: "PUT",
        credentials: "include",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(edit)        
    })
        return await request.json()
    // if(!req.ok) throw new Error(`Could not edit todo. Status:${req.status}`)
    
}

export const removeTodo = async (id) => {
    const response = await fetch(`${backEndUrl}/${id}`, {
            method: "DELETE",
            credentials: "include"
        }
    )
    if(response.status === 200){
        return await response.json()
    }else{
        return null
    }
}

export const completeTodo = async (id) => {
    const response = await fetch(`${backEndUrl}/${id}/complete`, {
        method: "PUT",
        credentials: "include",
        headers:{
                "Content-Type": "application/json"
            }
    })
    if(!response.ok){
        return response.status(409).json({
            error:{
                code: "CONFLICT",
                message: "Todo not completed."
            }
        })
    }
    if(!response.ok){
        return new Error("Could not complete todo.")
    }
    return await response.json()
}