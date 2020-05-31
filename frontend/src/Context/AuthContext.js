///Autenticação JWT com Context API e React Router
//https://www.youtube.com/watch?v=AClyxTbfI08 -> Autenticação JWT com Context API e React Router
//https://www.youtube.com/watch?v=FsCBw9X9U84 -> Como usar React Context (com Hooks) | Guilherme Rodz

//https://medium.com/@Charles_Stover/how-to-convert-withrouter-to-a-react-hook-19bb02a29ed6

//http://www.matera.com/blog/post/boas-praticas-para-desenvolvimento-de-apis-rest
//https://medium.com/@oieduardorabelo/express-entendendo-o-tratamento-de-erros-em-express-f5bc20ef9101

//

import React, { createContext } from 'react';

import useAuth from './hooks/userAuth';

const ContextAuth = createContext();

function AuthProvider({ children }) {
  return (
    <ContextAuth.Provider value={{ ...useAuth() }}>
      {children}
    </ContextAuth.Provider>
  );
}

export { ContextAuth, AuthProvider };
