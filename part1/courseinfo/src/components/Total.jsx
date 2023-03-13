const Total = (props) => {
    let total = 0;
    props.parts.map((item) => {
        total += item.exercises;
    })
    return(
        <p>Number of exercises { total }</p>
    );
}

export default Total;