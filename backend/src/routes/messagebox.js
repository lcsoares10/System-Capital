const express = require('express');
const routes = express.Router();

const authAdminMiddleware = require('@/src/middleware/authAdmin');
const messageBoxValidUser = require('@/src/middleware/messageBoxValidUser');

const MessageBoxController = require('@/src/controllers/MessageBoxController');

routes.get('/', authAdminMiddleware, MessageBoxController.index);
routes.get('/:id', messageBoxValidUser, MessageBoxController.get);

routes.post('/', authAdminMiddleware, MessageBoxController.create);

routes.post('/:id/viewd', messageBoxValidUser, MessageBoxController.setViewed);

module.exports = routes;
