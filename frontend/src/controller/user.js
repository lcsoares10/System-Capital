import api from '../services/api';

// function gerarPassword() {
//   return Math.random().toString(36).slice(-10);
// }

async function createUserInvestor(data) {
  data = { ...data, login: 'naoDefinido' };
  try {
    const id_investor = await api.post(
      `/investors/createInvestorContract`,
      data
    );
    return `Investidor ${id_investor.data.user.name} e contrato criado com sucesso`;
  } catch (error) {
    // console.log(error.response.data.message);
    return error;
  }
}
async function editUser(dataForm, id_user, type) {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };
  let url = '';

  switch (type) {
    case 'consultant':
      url = `/consultants/${id_user}`;
      break;
    case 'investor':
      url = `/investors/${id_user}`;
      break;
    default:
      url = `/administrator/${id_user}`;
      break;
  }

  try {
    const { data } = await api.put(url, dataForm, config);
    return `${data.data.user.name} seus dados foram alterados com sucesso`;
  } catch (error) {
    console.log(error);
    return error.response.message;
  }
}

async function detailUser(id_user, type) {
  let url = '';
  switch (type) {
    case 'consultant':
      url = `/consultants/${id_user}`;
      break;
    case 'investor':
      url = `/investors/${id_user}`;
      break;
    default:
      url = `/administrator/${id_user}`;
      break;
  }

  try {
    const { data } = await api.get(url);

    if (type === 'investor') {
      return data.data.user;
    }
    return data.user;
  } catch (error) {
    console.log(error);
    return error.response.message;
  }
}

export { createUserInvestor, editUser, detailUser };
