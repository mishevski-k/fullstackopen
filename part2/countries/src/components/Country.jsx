import weatherService from '../services/weatherService';
import { useEffect, useState } from 'react';
import Weather from './Weather';

const Country = ({ country}) => {
    const languages = Object.values(country.languages);
    const [ weatherData, setWeatherData ] = useState({});
    console.log(country);

    useEffect( () => {
        weatherService
            .getByCapital(country.capital)
            .then( data => {
                setWeatherData(data);
            });
    },["weatherMap"]);

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
            <h2>Weather in { country.capital }</h2>
            <Weather weatherData={weatherData} key="weatherMap"/>
        </div>
    )

}

export default Country;