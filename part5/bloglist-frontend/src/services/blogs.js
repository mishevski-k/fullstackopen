import axios from 'axios';
const baseUrl = '/api/v1/blogs';

let token = null;

const getAll = async () => {
    try {
        const request = await axios.get(baseUrl);
        return request.data;
    } catch (exception){
        console.log('error');
    }
};

const create = async (blog) => {
    try {

        token = window.sessionStorage.getItem('B_TOKEN');

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const request = await axios.post(baseUrl, blog, config);
        return request.data;
    } catch (exception){
        console.log('error');
    }
};

export default { getAll, create };