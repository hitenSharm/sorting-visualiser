import './element.css'

export const Element = (props) => {
    // console.log(props);
    return(
        <div
         className="block"
         style={{
             height:props.height,
             transform:props.transform,                                  
         }}
        >
            <p className="block_id">{props.value}</p>
        </div>
    );
}