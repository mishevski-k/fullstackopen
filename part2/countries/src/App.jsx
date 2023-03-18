import { useState } from 'react';
import countriesService from './services/countriesService';

import Countries from './components/Countries';
import Filter from './components/Filter';

const App = () => {

  const [ matchingCountries, setMatchingCountries ] = useState([]);

  const filterCountries = (event) => {
    let searchText = event.target.value;

    if(searchText === '') {
      return null;
    }

    console.log(searchText);
    
    countriesService
      .getByName(searchText)
      .then( countries => {
        if(countries.length <= 10){
          setMatchingCountries(countries);
        }else{
          setMatchingCountries([]);
        }
      })
  }

  const showCountry = (name) => {
    const wantedCountry = matchingCountries.filter( country => country.name.common === name);
  
    if(wantedCountry.length > 0){
      setMatchingCountries(wantedCountry);
    }
  }

  return (
    <div>
      <Filter handleChange={filterCountries} />
      <Countries countries={matchingCountries} handleCountryClick={showCountry}/>
    </div>
  )

}

export default App;