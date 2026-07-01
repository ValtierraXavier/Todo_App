import "./ExpandButton.css"

export const ExpandButton = ({expanded, setExpanded}) => {
    
    return(
        <div className={`chevron ${expanded?"expanded":""}`} onClick={()=>{setExpanded(prev => !prev)}}>^</div>
    )
}
