//https://medium.com/@justintulk/solve-module-import-aliasing-for-webpack-jest-and-vscode-74007ce4adc9
//https://arunmichaeldsouza.com/blog/aliasing-module-paths-in-node-js
//https://www.npmjs.com/package/module-alias
require('module-alias/register')

/** Prototype */
require('@/src/prototype/ModelSequelize');
require('@/src/prototype/String');
require('@/src/prototype/CryptoJS');

/** Server */
const express = require('express');
const cors = require('cors');
const routes = require('@/src/routes');
const inteceptedResponse = require('@/src/middleware/inteceptedResponse');
const useragent = require('express-useragent');

const app = express();

require('@/src/database');

/** Middlewares */
app.use(useragent.express());
app.use(cors());
app.use(express.json()); /*Informar que a requisição a ser usada será de json*/
app.use(inteceptedResponse);

/** Rotas */
app.use(routes);

module.exports = app;
