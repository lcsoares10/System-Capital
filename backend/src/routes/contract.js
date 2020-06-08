const express = require('express');
const routes = express.Router();

const contractValidUser = require('@/src/middleware/contractValidUser');
const authAdmin = require('@/src/middleware/authAdmin');

const ContractController = require('@/src/controllers/ContractController');

routes.get('/', authAdmin, ContractController.index);
routes.get('/:id', contractValidUser, ContractController.get);

routes.post('/', authAdmin, ContractController.create);
routes.put('/:id', authAdmin, ContractController.update);
routes.delete('/:id', authAdmin, ContractController.delete);

/** Contracts Pay Month */

routes.get('/:id/contractspaymonth', contractValidUser, ContractController.getPayMonth);
routes.post('/:id/contractspaymonth', authAdmin, ContractController.createPayMonth);

module.exports = routes;
