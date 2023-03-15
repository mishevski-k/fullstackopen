const Total = ({parts}) => {
    let total = 0;
    parts.map((item) => {
        total += item.exercises;
    })
    return(
        <p>Number of exercises { total }</p>
    );
}

export default Total;