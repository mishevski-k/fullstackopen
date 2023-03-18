import axios from "axios";

const baseUrl = '/api/v1/persons'

const getAll = () => {
    return axios.get(baseUrl).then( result => result.data );
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson).then( result => result.data);
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then( result => result);
}

const update = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person).then( result => result.data );
}

export default { getAll, create, remove, update }