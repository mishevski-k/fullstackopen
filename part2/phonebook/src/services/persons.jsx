import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then( result => result.data ).catch(error => alert("Could not get persons"));
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson).then( result => result.data).catch( error => alert(`Could not create new person`));
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then( result => result).catch( error => alert(`Could not delete person`));
}

export default { getAll, create, remove }