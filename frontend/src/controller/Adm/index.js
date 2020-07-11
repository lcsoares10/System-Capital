import api from '../../services/api';

async function getAllInvestors() {
  try {
    const { data } = await api.get('/investors');
    console.log(data);
    return data.data;
  } catch (error) {
    console.log(error.response);
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
