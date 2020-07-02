 /**
 * Configurations of logger.
 */
// const winston = require('winston');
// const winstonRotator = require('winston-daily-rotate-file');

// const consoleConfig = [
//   new winston.transports.Console({
//     'colorize': true
//   })
// ];

// const createLogger = winston.createLogger({
//   'transports': consoleConfig
// });

// const successLogger = createLogger;

// successLogger.add(winstonRotator, {
//   'name': 'access-file',
//   'level': 'info',
//   'filename': './logs/access.log',
//   'json': false,
//   'datePattern': 'yyyy-MM-dd-',
//   'prepend': true
// });

// const errorLogger = createLogger;

// errorLogger.add(winstonRotator, {
//   'name': 'error-file',
//   'level': 'error',
//   'filename': './logs/error.log',
//   'json': false,
//   'datePattern': 'yyyy-MM-dd-',
//   'prepend': true
// });

// module.exports = {
//   'successlog': successLogger,
//   //'errorlog': errorLogger
// };

//============================================================
// const winston = require('winston');

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     //
//     // - Write to all logs with level `info` and below to `combined.log`
//     // - Write all logs error (and below) to `error.log`.
//     //
//     new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
//     new winston.transports.File({ filename: './logs/combined.log' })
//   ]
// });

// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple()
//   }));
// }

// module.exports = logger;

//============================================================

// const transport_info = new (winston.transports.DailyRotateFile)({
//   level: 'error',
//   filename: './logs/info-%DATE%.log',
//   datePattern: 'YYYY-MM-DD-HH',
//   zippedArchive: true,
//   maxSize: '20m',
//   maxFiles: '14d'
// });

// const transport_error = new (winston.transports.DailyRotateFile)({
//   level: 'infor',
//   filename: './logs/error-%DATE%.log',
//   datePattern: 'YYYY-MM-DD-HH',
//   zippedArchive: true,
//   maxSize: '20m',
//   maxFiles: '14d'
// });

//============================================================

// const loginf = winston.createLogger({
//   level: 'info',
//   //format: winston.format.simple(),
//   format: winston.format.printf((info) => {
//     console.log(info.obj);
//     let message = `${moment().format('@HH:mm:ss')} | ${info.message} | `;
//     message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message;
//     //message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message;
//     return message
//   }),
//   transports: [
//     transport_info,
//     new winston.transports.Console({
//       format: winston.format.simple()
//     }),
//   ]
// });

// const logerr = winston.createLogger({
//   level: 'info',
//   format: winston.format.simple(),
//   transports: [
//     transport_error,
//     new winston.transports.Console({
//       format: winston.format.simple()
//     })
//   ]
// });

//============================================================

// if (process.env.NODE_ENV !== 'production') {
//   logerr.add(new winston.transports.Console({
//     format: winston.format.simple()
//   }));

//   loginf.add(new winston.transports.Console({
//     format: winston.format.simple()
//   }));
// }

// loginf.log('info', 'Message Teste', { obj: '111' });
// loginf.info('Message Teste', { obj: '222' });
// loginf.error('Message Teste', { obj: '333' });
// loginf.log('error', 'Message Teste', { obj: '444' });

//loginf.info('INFO:: Hello World!');
//logerr.error('ERRO:: Hello World!');

//module.exports = logger;


/* format: winston.format.printf((info) => {
  let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `;
  message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message;
  message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message;
  return message
}) */

//============================================================

const moment = require('moment');
const winston = require('winston');
require('winston-daily-rotate-file');


//============================================================

//console.log(winston.config.syslog.levels);

// const leves = {
//   error: 0,
//   warn: 1,
//   info: 1,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// }

//console.log(winston.config.npm.levels);

const logger = winston.createLogger({
  level: 'info',
  //level: leves,
  // defaultMeta: {
  //   service: 'user-service'
  // },
  format: winston.format.printf((info) => {
    const ignore = (obj) => {
      if (obj.token) obj.token = '...';
      if (obj.password) obj.password = '...';
      return obj;
    };

    const aux = {
      date: moment().format('@HH:mm:ss'),
      level: info.level.toUpperCase(),
      id_user: (logger.req && logger.req.user) ? logger.req.user.id_user : null,
      data: (info.obj) ? JSON.stringify(ignore(info.obj)) : null,
      reqBody: (logger.req) ? logger.req.body : null,
      message: `"${info.message}"`
    }

    // if (info.level == 'Error') {
    //   console.log((new Error()).stack);
    // }

    return message = `${aux.date} | ${aux.level} | user: ${aux.id_user} | message: ${aux.message} | data: ${aux.data}`;

  }),
  transports: [
    new (winston.transports.DailyRotateFile)({
      level: 'info',
      filename: './logs/all-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1d'
    }),
    new (winston.transports.DailyRotateFile)({
      level: 'error',
      filename: './logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1d'
    }),
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

logger.info = (message, obj) => {
  logger.log('info', message, { obj });
  //console.log(`message: ${message}`, `obj: ${JSON.stringify(obj)}`);
}

logger.error = (message, obj) => {
  logger.log('error', message, { obj });
  //console.log(`message: ${message}`, `obj: ${JSON.stringify(obj)}`);
}

module.exports = logger;

//https://stackoverflow.com/questions/61428648/how-do-i-log-messages-using-winston-and-passport-session
