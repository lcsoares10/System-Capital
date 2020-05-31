///Autenticação JWT com Context API e React Router
//https://www.youtube.com/watch?v=AClyxTbfI08 -> Autenticação JWT com Context API e React Router
//https://www.youtube.com/watch?v=FsCBw9X9U84 -> Como usar React Context (com Hooks) | Guilherme Rodz

//https://medium.com/@Charles_Stover/how-to-convert-withrouter-to-a-react-hook-19bb02a29ed6

//http://www.matera.com/blog/post/boas-praticas-para-desenvolvimento-de-apis-rest
//https://medium.com/@oieduardorabelo/express-entendendo-o-tratamento-de-erros-em-express-f5bc20ef9101

//https://www.youtube.com/watch?v=c3pUMcMSn-w -> [BR][Front-end] Autenticação com Firebase e Context API no ReactJS
//https://www.youtube.com/watch?v=gsJ6krEJTGM -> Gerenciando Autenticação com Context API no React Native

import React, { createContext, useContext } from 'react';

import useAuthHook from './hooks/useAuth';

const AuthContext = createContext();

function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={{ ...useAuthHook() }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return { ...context };
}

export { AuthContext, AuthProvider, useAuth };
