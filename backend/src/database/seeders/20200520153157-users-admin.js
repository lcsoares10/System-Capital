'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', 
    [
      {
        login: 'admin',
        email: 'admin@gmail.com',
        password: '123',
        name: 'administrador',
        is_admin: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};

/*
let users = [
  // {
  //   login: 'admin',
  //   email: 'admin@gmail.com',
  //   password: '123',
  //   name: 'administrador',
  //   is_admin: 1,
  //   created_at: new Date(),
  //   updated_at: new Date(),
  // }, 
  {
    config: {
      qtd: 1,
      association: 'administrator'
    },
    data: {
      login: 'administrator',
      email: 'administrator@gmail.com',
      password: '123',
      name: 'Administrador',
      created_at: new Date(),
      updated_at: new Date(),
    }
  },
  {
    config: {
      qtd: 1,
      association: 'consultant'
    },
    data: {
      login: 'consultant',
      email: 'consultant@gmail.com',
      password: '123',
      name: 'Consultor',
      created_at: new Date(),
      updated_at: new Date(),
    }
  },  
  {
    config: {
      qtd: 1
      association: 'investor'
    },
    data: {
      login: 'investor',
      email: 'investor@gmail.com',
      password: '123',
      name: 'Investidor',
      created_at: new Date(),
      updated_at: new Date(),
    }
  }, 
]
*/