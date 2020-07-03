import api from '../../services/api';

async function detailUser(id_user) {
  try {
    const { data } = await api.get(`/investors/${id_user}`);

    return data.data.user;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function editUser(dataForm, id_user) {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  try {
    const { data } = await api.put(`/investors/${id_user}`, dataForm, config);

    return 'Dados alterados com sucesso';
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { detailUser, editUser };
