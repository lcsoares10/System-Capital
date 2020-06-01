import { useState, useEffect } from 'react';

import api from '../../services/api';

export default function useAuth() {

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  //https://blog.rocketseat.com.br/reactjs-autenticacao/

  //unmount -> Desmontar
  useEffect(() => {

    function loadStorageData() {
      const storageToken = localStorage.getItem('token');
      const storageUSer = localStorage.getItem('user');

      if (storageToken && storageUSer) {
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;
        setUser(JSON.parse(storageUSer));
        setAuthenticated(true);
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function handleLogon(e, email, password, history) {
    e.preventDefault();
      try {
        const { data } = await api.post('/login',{ email, password });
        const { token, ...user } = data.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(user);
        setAuthenticated(true);

        alert(data.message);
        history.push('/profile');

      } catch(error) {
        setAuthenticated(false);
        const { data } = error.response;
        alert(data.message);
      }
  }

  async function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
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
    setUser
  }

}
