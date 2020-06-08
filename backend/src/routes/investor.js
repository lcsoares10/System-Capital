const express = require('express');
const routes = express.Router();
const multer = require('multer');
const multerConfig = require('@/src/config/multer');

const authAdmin = require('@/src/middleware/authAdmin');

const InvestorController = require('@/src/controllers/InvestorController');

routes.get('/', authAdmin, InvestorController.index);
routes.get('/:id', InvestorController.get);
routes.get('/:id/contracts', InvestorController.contracts);

routes.post('/', authAdmin, multer(multerConfig).single("profile"), InvestorController.create);
routes.put('/:id', authAdmin, InvestorController.update);
routes.delete('/:id', authAdmin, InvestorController.delete);

module.exports = routes;
