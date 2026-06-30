import { useState, useRef, useLayoutEffect } from "react";
import "./ItemDescription.css"
import { ExpandButton } from "../ExpandButton/ExpandButton.jsx"

export const ItemDescription = ({id, text}) => {
    //use this to set the expanded state of the "descriptionText"
    const textRef = useRef(null)
    const [expanded, setExpanded] = useState(false)
    const [canExpand, setCanExpand] = useState(false)

    useLayoutEffect(
        ()=>{
            if(textRef.current.scrollHeight > textRef.current.clientHeight){
                setCanExpand(true)
            }else{
                setCanExpand(false)
            }
        }
    ,[text])

    //this sets the expanded state which will trigger a change in the height css. 
    // const expandDescription = () => {
    //     const leftSide = document.getElementById("leftSide")
    //     const rightSide = document.getElementById("rightSide")
    //     const textBox = document.getElementById("descriptionText")
    // }
    //maybe useEffect to hadndle the transformation effect when expanded value is changed. 


    
    return(
        <div className="itemDescription" key={id}>
            {/* <div className="expandButton">
                <div className="arrowIndicator" id="leftSide"></div>
                <div className="arrowIndicator" id="rightSide"></div>
            </div> */}

            <p 
                className={`descriptionText ${expanded? "expanded": ""}`} 
                key={id}
                ref={textRef}
            >
                {text}
            </p>
            {canExpand && 
            <ExpandButton 
                expanded={expanded} 
                setExpanded={setExpanded}
            />}
        </div>

    )
}