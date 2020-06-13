//https://medium.com/@justintulk/solve-module-import-aliasing-for-webpack-jest-and-vscode-74007ce4adc9
//https://arunmichaeldsouza.com/blog/aliasing-module-paths-in-node-js
//https://www.npmjs.com/package/module-alias
require('module-alias/register')
require('moment/locale/pt-br');

/** Prototype */
require('@/src/prototype/ModelSequelize');
require('@/src/prototype/String');
require('@/src/prototype/CryptoJS');

/** Banco de Dados */
require('@/src/database');

/** ==========================================================*/
/** Server */
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('@/src/routes');
const useragent = require('express-useragent');

/** ==========================================================*/
/** Custom */
const inteceptedResponse = require('@/src/middleware/inteceptedResponse');

/** ==========================================================*/
/** App */
const app = express();

/** ==========================================================*/
/** Middlewares */
/** ==========================================================*/
app.use(useragent.express()); /** User Agente */
app.use(cors()); /** Segurança de Api */
app.use(express.json()); /*Informar que a requisição a ser usada será de json*/

/** ==========================================================*/
//Extra
app.use(inteceptedResponse);

/** ==========================================================*/
//Statics
//https://www.youtube.com/watch?v=MkkbUfcZUZM - Upload de arquivos: back-end com NodeJS | Diego Fernandes
app.use('/files', express.static(path.resolve(__dirname, '../tmp/uploads')));

/** ==========================================================*/
/** Disponibilizar req for Log  */
app.use((req, res, next) => {
  const logger = require('@/src/services/logger');
  logger.req = req;
  next();
});

/** ==========================================================*/
/** Rotas */
app.use(routes);

/** ==========================================================*/

/** Entender como funciona */
/* app.use(function(err, req, res, next) {
  console.error('aauaiuaiua', err.message);
  res.status(500).send('Something broke!');
}); */

module.exports = app;

