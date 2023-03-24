import axios from 'axios';
const baseUrl = '/api/v1/auth';

const login = async (request) => {
    try {
        const response = await axios.post(`${baseUrl}/login`, request);
        return response.data;
    } catch (expection){
        console.log('Error', expection);
    }
};

export default {login};