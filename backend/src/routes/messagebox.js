const express = require('express');
const routes = express.Router();

const authAdminMiddleware = require('@/src/middleware/authAdmin');

const MessageBoxController = require('@/src/controllers/MessageBoxController');

routes.get('/', authAdminMiddleware, MessageBoxController.index);
routes.get('/:id', MessageBoxController.get);

routes.post('/', authAdminMiddleware, MessageBoxController.create);

module.exports = routes;
