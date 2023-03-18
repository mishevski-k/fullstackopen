import Country from "./Country";

const Countries = ({countries, handleCountryClick}) => {

    const countryAmount = countries.length;

    if(countryAmount === 0){
        return(
            <div>Too many matches, specify another filter</div>
        )
    }

    if(countryAmount === 1){
        console.log(countries[0])
        return(
            <Country country={countries[0]} />
        )
    }

    return(
        <div>
            {countries.map((country) => {
                return <div key={country.cca2}>{country.name.official}<button onClick={() => handleCountryClick(country.name.common)}>show</button></div>
            })}
        </div>
    )
}

export default Countries;