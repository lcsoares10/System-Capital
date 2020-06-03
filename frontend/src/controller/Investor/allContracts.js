import api from '../../services/api';

export default async function allContracts(id){
    console.log(api.defaults.headers.Authorization);
    try {
        
        const { data } = await api.get(`/investors/${id}/contracts`,{
            headers:{Authorization:api.defaults.headers.Authorization}
        });

        return data.data.rows;
    } catch (error) {
        console.log(error);
        return error;
    }
    
}
