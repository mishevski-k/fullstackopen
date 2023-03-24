import axios from 'axios';
const baseUrl = '/api/v1/blogs';

const getAll = async () => {
    try {
        const request = await axios.get(baseUrl);
        return request.data;
    } catch (exception){
        console.log('error');
    }
};

export default { getAll };