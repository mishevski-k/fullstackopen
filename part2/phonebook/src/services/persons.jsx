import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then( result => result.data ).catch(error => alert("Could not get persons"));
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson).then( result => result.data).catch( error => alert(`Could not create new person`));
}

export default { getAll, create }