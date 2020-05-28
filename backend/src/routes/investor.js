const express = require('express');
const routes = express.Router();

const InvestorController = require('@/src/controllers/InvestorController');

routes.get('/', InvestorController.index);
routes.get('/:id', InvestorController.get);
routes.get('/:id/contracts', InvestorController.contracts);

routes.post('/', InvestorController.create);
routes.put('/:id', InvestorController.update);
routes.delete('/:id', InvestorController.delete);

module.exports = routes;
