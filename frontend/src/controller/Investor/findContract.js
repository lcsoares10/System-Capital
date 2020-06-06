import api from '../../services/api';

export default async function findContract(id) {
    try {
        const { data } = await api.get(`/contracts/${id}`);
        console.log(data)
        return data;

    } catch (error) {
        console.log(error);
        return error;
    }
}
