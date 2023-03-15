const Total = ({parts}) => {
    let total = 0;
    parts.map((item) => {
        total += item.exercises;
    })
    return(
        <h4>Number of exercises { total }</h4>
    );
}

export default Total;