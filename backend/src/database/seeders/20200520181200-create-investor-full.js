'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {

      return new Promise(async (resolve, reject) => {
        try {

          let id_user;
          let id_consultant;
          let id_investor;
          let id_contract;

          for (var i = 0; i <= 5; i++) {

            //http://devfuria.com.br/javascript/numeros-aleatorios/
            //Como gerar um número randômico no “range” dos inteiros positivos (entre 0 e 65536):
            let key = Math.floor(Math.random() * 65536);

            //---
            //Consultants
            id_user = await queryInterface.bulkInsert('users',
              [
                {
                  login: `consultant_${key}`,
                  email: `consultant_${key}@gmail.com`,
                  password: key,
                  is_admin: (key % 2 === 0) ? true : false,
                  name: `Consultor_${key}`,
                  created_at: new Date(),
                  updated_at: new Date(),
                },
              ], { transaction: t }
            );

            id_consultant = await queryInterface.bulkInsert('consultants',
              [
                {
                  id_user
                },
              ], { transaction: t }
            );

            //---
            //Investors
            id_user = await queryInterface.bulkInsert('users',
              [
                {
                  login: `investor_${key}`,
                  email: `investor_${key}@gmail.com`,
                  password: key,
                  name: `Investidor_${key}`,
                  created_at: new Date(),
                  updated_at: new Date(),
                },
              ], { transaction: t }
            );

            id_investor = await queryInterface.bulkInsert('investors',
              [
                {
                  id_user,
                  id_consultant
                },
              ], { transaction: t }
            );

            //---
            //Contracts
            id_contract = await queryInterface.bulkInsert('contracts',
              [
                {
                  id_investor,
                  begin: new Date(),
                  day: 5,
                  time: '12',
                  value: '10000',
                  created_at: new Date(),
                  updated_at: new Date(),
                },
              ], { transaction: t }
            );

            //---
            //Contract_pay_competences
            await queryInterface.bulkInsert('contract_pay_competences',
              [
                {
                  id_contract,
                  value: '1000',
                  competence: '202005',
                  id_user_pay: 2,
                  created_at: new Date(),
                  updated_at: new Date(),
                },
              ], { transaction: t }
            );
          }
          resolve();

        } catch (error) {
          reject(error);
        }

      });
    })
  },

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};

