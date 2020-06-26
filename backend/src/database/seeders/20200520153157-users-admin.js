'use strict';

const bcrypt = require('bcrypt');
const cpf = require("@fnando/cpf/commonjs");

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users',
    [
      {
        login: 'admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)),
        identif: cpf.generate(),
        name: 'administrador_root',
        is_admin: 1,
        last_name: `administrador_root_ln`,
        tel: '219'+ Math.floor(10000000 + Math.random() * 9999999),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
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
