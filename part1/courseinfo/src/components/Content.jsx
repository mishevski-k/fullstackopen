const Content = (props) => {
    return(
        <div>
            {props.parts.map((item, index) => {
                return <p key={index}>{item.name} {item.exercises}</p>
            })}
        </div>
    );
}

export default Content;