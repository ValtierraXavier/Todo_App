
export const TodoItem = ({data, handleComplete, prepEdit, editingId, handleDelete}) => {
    return(
        <>
            <h3>{data.item}</h3>
            <p>{data.description}</p>
            <p>{new Date(data.created).toLocaleDateString()}</p>
            <p>{data.complete? `Completed : ${new Date().toLocaleDateString()}`: "Incomplete"}</p>
            <button className="actionButton" id={data.id} onClick={() => {handleComplete(data.id)}} disabled={data.complete}>complete</button>
            <button className="actionButton" id={data.id} onClick={() => prepEdit(data.id)} disabled={data.complete||editingId}>Edit</button>
            <button className="actionButton" id={data.id} onClick={() => handleDelete(data.id)}>Delete</button>
        </>
    )
}