export const AddTodoButton = ({toggleAddForm}) => {
    // show the AddTodoForm
    return (
        <button className="addFormOpenButton" onClick={()=>{toggleAddForm("open")}}>Add Todo</button>
    )
}