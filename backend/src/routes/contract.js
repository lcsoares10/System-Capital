const express = require('express');
const routes = express.Router();

const ContractController = require('@/src/controllers/ContractController');

routes.get('/', ContractController.index);
routes.get('/:id', ContractController.get);

routes.post('/', ContractController.create);
routes.put('/:id', ContractController.update);
routes.delete('/:id', ContractController.delete);

/** Contracts Pay Month */

routes.get('/:id/contractspaymonth', ContractController.getPayMonth);
routes.post('/:id/contractspaymonth', ContractController.createPayMonth);

module.exports = routes;
