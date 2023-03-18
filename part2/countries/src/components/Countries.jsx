import Country from "./Country";
import CountryLine from "./CountryLine";

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
                return <CountryLine key={country.cca2} country={country} handleClick={handleCountryClick} />
            })}
        </div>
    )
}

export default Countries;