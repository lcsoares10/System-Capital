import api from '../../services/api';

async function getAllInvestors(page, valueSearch) {
  try {
    const { data } = await api.get(
      '/investors?page=' + page + '&search=' + valueSearch
    );

    return data.data;
  } catch (error) {
    return error.response;
  }
}

async function getAllConsultants(page, valueSearch) {
  try {
    const { data } = await api.get(
      '/consultants?page=' + page + '&search=' + valueSearch
    );
    //console.log(data)
    return data;
  } catch (error) {
    // console.log(error.response.data.message)
    return error.response.data.message;
  }
}

async function payMonthContract(id_contract, data) {
  try {
    const response = await api.post(
      `/contracts/${id_contract}/contractspaymonth`,
      data
    );

    return response;
  } catch (error) {
    // console.log(error.response.data.message)
    return error;
  }
}

async function sendMessage(user, messagem) {
  try {
    const response = await api.post(`/messagesbox/${user}`, { messagem });

    return response;
  } catch (error) {
    // console.log(error.response.data.message)
    return error;
  }
}

async function consultantsYeld(user_id, year) {
  try {
    const response = await api.post(`/consultants/${user_id}/yield/${year}`);

    return response;
  } catch (error) {
    // console.log(error.response.data.message)
    return error;
  }
}

async function getAllContracts() {
  try {
    const { data } = await api.get(`/contracts`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
    return error;
  }
}

export {
  getAllInvestors,
  getAllConsultants,
  payMonthContract,
  sendMessage,
  consultantsYeld,
  getAllContracts,
};
