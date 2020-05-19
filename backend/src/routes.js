const express = require('express');
const routes = express.Router();

const UserController = require('@/src/controllers/UserController');
const InvestorController = require('@/src/controllers/InvestorController');
const ConsultantController = require('@/src/controllers/ConsultantController');
const AdministratorController = require('@/src/controllers/AdministratorController');

routes.get('/', (req, res) => (
    //res.send('Root !!')
    res.json({ hello: 'Hello Word' })
));

routes.get('/users', UserController.index);
routes.get('/investors', InvestorController.index);
routes.get('/consultants', ConsultantController.index);
routes.get('/consultants/:id/investors', ConsultantController.investors);
routes.get('/administrators', AdministratorController.index);

module.exports = routes;