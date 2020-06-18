const express = require('express');
const routes = express.Router();
const multer = require('multer');
const multerConfig = require('@/src/config/multer');

const authAdmin = require('@/src/middleware/authAdmin');
const ConsultantValidUser = require('@/src/middleware/ConsultantValidUser');

const ConsultantController = require('@/src/controllers/ConsultantController');
const ConsultantYeldController = require('@/src/controllers/ConsultantYeldController');

routes.get('/', authAdmin, ConsultantController.index);
routes.get('/:id', ConsultantValidUser, ConsultantController.get);
routes.get('/:id/investors', ConsultantController.getInvestors);

routes.get('/:id/yield/:year', ConsultantYeldController.getYield);
routes.get('/:id/yield/:year/month-detail/:month', ConsultantYeldController.getYieldMonthDetail);

routes.post('/', authAdmin, multer(multerConfig).single("profile"), ConsultantController.create);
routes.put('/:id', ConsultantValidUser, multer(multerConfig).single("profile"), ConsultantController.update);
routes.delete('/:id', authAdmin, ConsultantController.delete);

module.exports = routes;
