const express = require('express');
const routes = express.Router();

//const authAdminMiddleware = require('@/src/middleware/authAdmin');

const UserController = require('@/src/controllers/UserController');

routes.get('/', UserController.index);
routes.get('/:id', UserController.get);
routes.get('/:id/messages', UserController.getMessages);

module.exports = routes;
