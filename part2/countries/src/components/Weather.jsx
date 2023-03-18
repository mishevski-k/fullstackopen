const Weather = ({weatherData}) => {
    console.log(weatherData.main);
    if(typeof weatherData === 'undefined' || Object.keys(weatherData).length === 0){
        return(
            <div>
                No weather data found
            </div>
        )
    }

    return (
        <div>
            <p>temperature {Math.floor(weatherData.main.temp - 273)}  Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}></img>
            <p>wind {weatherData.wind.speed} m/s</p>
        </div>
    )
}

export default Weather;