const Filter = ({value, handleChange}) => {
    return(
        <div>
            filter shown with: <input onChange={ handleChange } value={ value } />
        </div>
    )
}

export default Filter;