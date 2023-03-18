const Filter = ({handleChange}) => {
    return (
        <div>
            Filter <input onKeyUp={handleChange}></input>
        </div>
    )
}

export default Filter;