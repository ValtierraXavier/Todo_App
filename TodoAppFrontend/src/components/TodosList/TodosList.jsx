import "./TodosList.css"
import{ TodoItem } from "../TodoItem/TodoItem.jsx"
export const TodosList = ({listItems, handleComplete, prepEdit, editingId, handleDelete}) => {
    return(
        <div className="todoList">
            {
                listItems.map((todo, i)=>{
                    return(
                        <TodoItem
                            key={`todo${i}`} 
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