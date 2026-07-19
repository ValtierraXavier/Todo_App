const backendUrl = 'http://localhost:3000/users'
//returns the response from requireAuth
export const checkUser = async () => {
    const response = await fetch(`${backendUrl}/me`,{
        method: "GET",
        credentials: "include"
    })
    if(response.status !== 200){
        return null
    }
    // console.log(await response.json())
    return await response.json()
}
//removes the http-only cookie.
export const userLogout = async () => {
    const response = await fetch(`${backendUrl}/logout`,{
        method: "POST",
        credentials: "include"
    })
    if(!response.ok){
        console.log("could not log out.")
    }
    console.log("logged out.")
}

export const userLogin = async (form) => {
    const response = await fetch(`${backendUrl}/login`, {
        method: "POST",
        credentials: "include",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
    if(response.status !== 200) return null
    return response.json()
}

export const userSignup = async (form) => {
    const response = await fetch(`${backendUrl}/new`,{
            method: "POST",
            credentials: "include",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        if(response.status !== 201) return null
        return response.json()
}