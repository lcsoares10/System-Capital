const express = require('express');
const routes = express.Router();

const authAdmin = require('@/src/middleware/authAdmin');
const userValidUser = require('@/src/middleware/userValidUser');

const UserController = require('@/src/controllers/UserController');

routes.get('/', authAdmin, UserController.index);
routes.get('/:id', authAdmin, UserController.get);
routes.get('/:id/messages', userValidUser, UserController.getMessages);

module.exports = routes;
