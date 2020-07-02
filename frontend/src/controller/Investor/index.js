import api from '../../services/api';

async function detailUser(id_user) {
  try {
    const { data } = await api.get(`/investors/${id_user}`);
    console.log(data.data.user);
    return data.data.user;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function editUser(data, id_user) {
  try {
    const { data } = await api.get(`/investors/${id_user}`, { ...data });
    console.log(data.data.user);
    return 'Dados alterados com sucesso';
  } catch (error) {
    console.log(error);
    return error;
  }
}

export { detailUser, editUser };
