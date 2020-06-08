import api from '../../services/api';

export default async function findContract(id) {
    try {
        const { data } = await api.get(`/consultants/${id}`);
        console.log(data.user.name);
        return data.user;

    } catch (error) {
        console.log(error);
        return error;
    }
}
