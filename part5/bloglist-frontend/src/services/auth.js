import axios from 'axios';
const baseUrl = '/api/v1/auth';

const login = async (request) => {
    const response = await axios.post(`${baseUrl}/login`, request);
    return response.data;
};

export default {login};