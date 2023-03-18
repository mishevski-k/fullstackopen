import { useState, useEffect } from 'react';
import axios from 'axios';

import Countries from './components/Countries';

const App = () => {

  const [ matchingCountries, setMatchingCountries ] = useState([]);

  const getContries = name => {

    return axios.get(`https://restcountries.com/v3.1/name/${name}`).then( response => response.data );
  }

  const filterCountries = (event) => {
    let searchText = event.target.value;

    if(searchText === '') {
      return null;
    }

    console.log(searchText);
    getContries(searchText)
      .then( countries => {
        if(countries.length <= 10){
          setMatchingCountries(countries);
        }else{
          setMatchingCountries([]);
        }
      })
  }

  return (
    <div>
      <div>
        find contries <input onKeyUp={filterCountries}></input>
      </div>
      <Countries countries={matchingCountries} />
    </div>
  )

}

export default App;