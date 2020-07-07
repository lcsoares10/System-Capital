const express = require('express');
const routes = express.Router();
const multer = require('multer');
const multerConfig = require('@/src/config/multer');

//const authAdmin = require('@/src/middleware/authAdmin');
//const { valid } = require('@/src/middleware/routers/consultant');

const AttachmentController = require('@/src/controllers/AttachmentController');

routes.get('/attachmentsForValid', AttachmentController.attachmentsForValid);

routes.post('/attach/:id_user', multer(multerConfig).single('file'), AttachmentController.attach);
routes.delete('/detach/:id', AttachmentController.detach);

routes.post('/toogleValidAttachment/:id', AttachmentController.toogleValidAttachment);

module.exports = routes;
