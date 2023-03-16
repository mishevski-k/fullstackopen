const PhoneLine = ({name, number, id, handleDelete}) => {
    return (
        <p>{ name } { number } <button onClick={()=> handleDelete(id)}>delete</button></p>
    );
}

export default PhoneLine;