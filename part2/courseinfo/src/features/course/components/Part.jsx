const Part = ({id, name, exercises}) => {
    console.log(id, name, exercises)
    return(
        <p>{ name } { exercises }</p>
    );
}

export default Part;