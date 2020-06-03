import api from '../../services/api';

export default async function findContract(id) {
    console.log(api.defaults.headers.Authorization);
    try {
        
        const { data } = await api.get(`/contracts/${id}`,{
            headers:{Authorization:api.defaults.headers.Authorization}
        });
        
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
    
}
