const express = require('express');
const routes = express.Router();

const log = require('@/src/services/logger');

routes.post('/log', (req, res) => {
  log.info(`Retun sucess response`);
  res.json({ result: 'Fim' });
});

module.exports = routes;
