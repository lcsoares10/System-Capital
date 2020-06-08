import 'moment/locale/pt-br';
import './prototype/String.js';

import React from 'react';
import Routes from './routes';
import AuthProvider from './Context/AuthContext';

import './global.css';//define stilo css global

function App() {

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
