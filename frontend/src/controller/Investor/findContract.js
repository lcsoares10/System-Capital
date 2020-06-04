import api from '../../services/api';

export default async function findContract(id) {
    try {
        const { data } = await api.get(`/contracts/${id}`);
        return data;

    } catch (error) {
        console.log(error);
        return error;
    }
}
