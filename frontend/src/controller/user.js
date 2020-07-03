import api from '../services/api';

function gerarPassword() {
  return Math.random().toString(36).slice(-10);
}

async function createUserInvestor(data) {
  data = { ...data, login: 'naoDefinido' };
  try {
    const id_investor = await api.post(
      `/investors/createInvestorContract`,
      data
    );
    return 'Investidor e contrato criado com sucesso';
  } catch (error) {
    console.log(Response.data);
    return error;
  }
}

export { createUserInvestor };
