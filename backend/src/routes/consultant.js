const express = require('express');
const routes = express.Router();
const multer = require('multer');
const multerConfig = require('@/src/config/multer');

const authAdmin = require('@/src/middleware/authAdmin');

const ConsultantController = require('@/src/controllers/ConsultantController');

routes.get('/', authAdmin, ConsultantController.index);
routes.get('/:id', ConsultantController.get);
routes.get('/:id/investors', ConsultantController.getInvestors);

//routes.post('/', ConsultantController.create);
routes.post('/', authAdmin, multer(multerConfig).single("profile"), ConsultantController.create);
routes.put('/:id', authAdmin, ConsultantController.update);
routes.delete('/:id', authAdmin, ConsultantController.delete);

module.exports = routes;
