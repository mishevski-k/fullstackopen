const CountryLine = ({ country, handleClick }) => {
    return (
    <div>
        { country.name.official }
        <button onClick={() => handleClick(country.name.common)}>
            show
        </button>
    </div>
    )
}

export default CountryLine;