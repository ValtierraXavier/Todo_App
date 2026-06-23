export const AddTodoForm = ({handleChange, handleSubmit, todo, editingId, toggleAddForm}) => {
    //prop for toggling "hidden"
    return(
        <>
            <form onSubmit={handleSubmit}>
                <h3>Add a Todo</h3>
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
            <button classsName = "addFormCloseButton" onClick={()=>{toggleAddForm("close")}}>Close</button>
      </>
    )
}