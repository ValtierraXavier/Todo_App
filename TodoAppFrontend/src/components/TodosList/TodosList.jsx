import "./TodosList.css"
import{ TodoItem } from "../TodoItem/TodoItem.jsx"
export const TodosList = ({listItems, handleComplete, prepEdit, editingId, handleDelete}) => {
    return(
        <div className="todoList">
            {
                listItems.map((todo)=>{
                    return(
                        <TodoItem
                            key={todo.id} 
                            data={todo} 
                            handleComplete={handleComplete} 
                            prepEdit={prepEdit} 
                            editingId={editingId}
                            handleDelete={handleDelete}
                        />
                    )
                })
            }
        </div>
    )
}