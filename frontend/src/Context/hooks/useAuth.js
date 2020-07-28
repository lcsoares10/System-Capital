import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Swal from 'sweetalert2';

import erros from '../../utils/erros';

export default function useAuth() {
  const history = useHistory();

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  //https://blog.rocketseat.com.br/reactjs-autenticacao/

  useEffect(() => {
    function loadStorageData() {
      try {
        const storageToken = localStorage.getItem('token_X6_Capital');

        if (storageToken) {
          api.defaults.headers.Authorization = `Bearer ${storageToken}`;
          const { payload } = jwtDecode(storageToken);
          setUser(payload.user);
          setAuthenticated(true);
        }
      } catch {
        alert('Token inválido');
        _logout();
      }

      setLoading(false);
    }
    loadStorageData();
  }, []);

  function jwtDecode(t) {
    const [header, payload] = t.split('.');
    return {
      raw: t,
      header: window.atob(header),
      payload: JSON.parse(window.atob(payload)),
    };
  }

  async function handleLogon(e, email, password) {
    e.preventDefault();
    try {
      const { data } = await api.post('/login', { email, password });
      const { token } = data.data;
      const { payload } = jwtDecode(token);

      localStorage.setItem('token_X6_Capital', token);
      api.defaults.headers.Authorization = `Bearer ${token}`;

      setUser(payload.user);
      setAuthenticated(true);

      Swal.fire({
        title: 'Sucesso',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'OK',
        background: '#121212',
        confirmButtonColor: '#a0770a',
      });

      // history.push('/profile');
    } catch (error) {

      setAuthenticated(false);
      //const msg = (error.response) ? error.response.data.message : error.message;

      Swal.fire({
        title: 'Erro!',
        text: erros.getMessage(error),
        icon: 'error',
        confirmButtonText: 'OK',
        background: '#121212',
        confirmButtonColor: '#a0770a',
      });
    }
  }

  async function handleLogout(e) {
    e.preventDefault();
    _logout();
  }

  function _logout() {
    localStorage.removeItem('token_X6_Capital');
    localStorage.removeItem('user');
    api.defaults.headers.Authorization = undefined;
    setUser({});
    setAuthenticated(false);
  }

  return {
    authenticated,
    handleLogon,
    handleLogout,
    loading,
    user,
    setUser,
  };
}
