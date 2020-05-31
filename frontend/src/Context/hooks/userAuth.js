import { useState, useEffect } from 'react';

import api from '../../services/api';

export default function useAuth() {

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(()=>{
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogon(e, email, password, history) {
    e.preventDefault();
      try {
        const { data } = await api.post('/login',{ email, password });
        const { token } = data.data;

        console.log(data.data);

        localStorage.setItem('token', JSON.stringify(token));
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
    api.defaults.headers.Authorization = undefined;
    setAuthenticated(false);
  }

  return {
    loading,
    authenticated,
    handleLogon,
    handleLogout,
    user,
    setUser
  }

}
