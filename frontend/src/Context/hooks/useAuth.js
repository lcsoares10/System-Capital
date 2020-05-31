import { useState, useEffect } from 'react';

import api from '../../services/api';

export default function useAuth() {

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(JSON.parse(user));
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogon(e, email, password, history) {
    e.preventDefault();
      try {
        const { data } = await api.post('/login',{ email, password });
        const { token, ...user } = data.data;

        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));

        api.defaults.headers.Authorization = `Bearer ${token}`;
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
    localStorage.setItem('token');
    localStorage.setItem('user');
    api.defaults.headers.Authorization = undefined;
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
