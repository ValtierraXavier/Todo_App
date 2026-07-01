import "./TodoItem.css"
import { ItemDescription } from"../ItemDescription/ItemDescription.jsx"

export const TodoItem = ({data, handleComplete, prepEdit, editingId, handleDelete}) => {
    return(
        <div className="todoItem">
            <div className="texts">
                <h4 className="todoName">{data.item}</h4>
                <ItemDescription className="todoDescription" text={data.description} />
            </div>
            <div className="completion">
                <p>{data.complete? ` Task completed : ${new Date().toLocaleDateString()}`: "Task incomplete"}</p>
                <p>{`Created: ${new Date(data.created).toLocaleDateString()}`}</p>
                <p>{`Due: ${new Date(data.created).toLocaleDateString()}`}</p>
            </div>
            <div className="actionButtons">
                <button className="actionButton" id={data.id} onClick={() => {handleComplete(data.id)}} disabled={data.complete}>Complete</button>
                <button className="actionButton" id={data.id} onClick={() => prepEdit(data.id)} disabled={data.complete||editingId}>Edit</button>
                <button className="actionButton" id={data.id} onClick={() => handleDelete(data.id)}>Delete</button>
            </div>
        </div>
    )
}