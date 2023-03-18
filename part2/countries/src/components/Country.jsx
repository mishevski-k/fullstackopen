const Country = ({ country}) => {
    const languages = Object.values(country.languages);
    console.log(country);

    return(
        <div>
            <h2>{ country.name.official }</h2>
            <p>capital { country.capital }</p>
            <p>area { country.area }</p>
            <h3>languages</h3>
            <ul>
                {languages.map(( item, index ) => {
                    return <li key={index}>{ item }</li>
                })}
            </ul>
            <img src={country.flags.svg} alt={country.flag.alt}></img>
        </div>
    )

}

export default Country;