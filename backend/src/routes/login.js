const express = require('express');
const routes = express.Router();

const LoginController = require('@/src/controllers/LoginController');

routes.post('/', LoginController.login);

module.exports = routes;
