import axios from 'axios';

const getByName = name => {
    return axios.get(`https://restcountries.com/v3.1/name/${name}`).then( response => response.data );
}

export default { getByName }