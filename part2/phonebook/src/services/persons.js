import axios from 'axios';
const baseUrl = 'https://boiling-ridge-74446.herokuapp.com/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

const handleDelete = (id) => {
    return (
        axios
            .delete(`${baseUrl}/${id}`)
    )
}

export default {
    getAll,
    create,
    update,
    handleDelete
}