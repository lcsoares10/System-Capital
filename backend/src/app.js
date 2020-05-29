//https://medium.com/@justintulk/solve-module-import-aliasing-for-webpack-jest-and-vscode-74007ce4adc9
//https://arunmichaeldsouza.com/blog/aliasing-module-paths-in-node-js
//https://www.npmjs.com/package/module-alias
require('module-alias/register')

/** Prototype */
require('@/src/prototype/String');

/** Server */
const express = require('express');
const cors = require('cors');
const routes = require('@/src/routes');

const app = express();

require('@/src/database');

app.use(cors());
app.use(express.json()); /*Informar que a requisição a ser usada será de json*/

//https://medium.com/@selvaganesh93/how-node-js-middleware-works-d8e02a936113
/** Interceptando o response */
app.use((req, res, next) => {
  let oldSend = res.send
  res.send = function(data) {
      data = JSON.parse(data);
      const result = {
        sucess: (res.statusCode !== 200) ? false : true,
        ...data
      }
      res.send = oldSend // set function back to avoid the 'double-send'
      return res.send(result) // just call as normal with data
  }
  next()
})

app.use(routes);

module.exports = app;
