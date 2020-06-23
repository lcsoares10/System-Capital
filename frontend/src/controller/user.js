import api from '../services/api';

function gerarPassword() {
  return Math.random().toString(36).slice(-10);
}

async function createUser(typeUser, data, data_contract) {
  data = {
    ...data,
    password: gerarPassword(),
  };

  if (typeUser === 'investor') {
    try {
      const id_investor = await api.post(`/investors`, data);

      data_contract = {
        ...data_contract,
        id_investor,
      };

      await api.post(`/contracts`, data);
      return 'Investidor e contrato criado com sucesso';
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  try {
    await api.post(`/consultants`, data);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { createUser };
