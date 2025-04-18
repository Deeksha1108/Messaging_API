const { createLogger, format, transports } = require('winston');
const path = require('path');

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] : ${stack || message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(),                   
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),     
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
    }),
    new transports.File({
      filename: path.join(__dirname, '../logs/combined.log'),
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: path.join(__dirname, '../logs/exceptions.log') }),
  ]
});

module.exports = logger;
