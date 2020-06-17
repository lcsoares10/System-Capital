import api from '../../services/api';

 async function AllAssoatedinvestors(id_consultant) {
    try {

        const { data } = await api.get(`/consultants/${id_consultant}/investors`);
        console.log(data)
        return data;

    } catch (error) {
  
        console.log(error.response);
        return error;
    }

}


export{AllAssoatedinvestors}