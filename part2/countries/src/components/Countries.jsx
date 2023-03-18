import Country from "./Country";

const Countries = ({countries}) => {

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
                return <div key={country.cca2}>{country.name.official}</div>
            })}
        </div>
    )
}

export default Countries;