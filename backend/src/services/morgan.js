var morgan = require('morgan')
var path = require('path')
var rfs = require('rotating-file-stream') // version 2.x
const moment = require('moment');

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
  interval: '2d', // rotate daily
  path: path.join(__dirname, '../../logs')
})

morgan.token('date', function(){
  return moment().format();
})

// setup the logger
const format = '[:date[clf]] :remote-addr ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"';
//app.use(morgan('combined'));

module.exports = morgan(format, { stream: accessLogStream });
