const Part = (props) => {
    return(
        <p key={ props.index } >{ props.name } { props.exercises }</p>
    );
}

export default Part;