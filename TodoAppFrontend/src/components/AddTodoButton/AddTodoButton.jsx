import "./AddTodoButton.css"
export const AddTodoButton = ({setActiveModal}) => {
    // show the AddTodoForm
    return (
        <button className="addFormOpenButton" onClick={
            ()=>{setActiveModal("addTodo")}}
        >
                Add Todo
        </button>
    )
}