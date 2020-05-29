const express = require('express');
const routes = express.Router();

const ConsultantController = require('@/src/controllers/ConsultantController');

routes.get('/', ConsultantController.index);
routes.get('/:id', ConsultantController.get);
routes.get('/:id/investors', ConsultantController.getInvestors);

routes.post('/', ConsultantController.create);
routes.put('/:id', ConsultantController.update);
routes.delete('/:id', ConsultantController.delete);

module.exports = routes;
