import api from '../../services/api';

async function getAllInvestors() {
  try {
    const { data } = await api.get('/investors');

    return data.data;
  } catch (error) {
    return error.response;
  }
}

async function getAllConsultants() {
  try {
    const { data } = await api.get('/consultants');
    //console.log(data)
    return data;
  } catch (error) {
    // console.log(error.response.data.message)
    return error.response.data.message;
  }
}

export { getAllInvestors, getAllConsultants };
