// Gets packages
const winston = require('winston');
const morgan = require('morgan');

// Custom formats for winston logger
const consoleFormat = winston.format.printf((props) => `${props.level}:   ${props.message}`);
const logFileFormat = winston.format.printf((props) => `${props.level}:   ${props.timestamp}   ${props.message}`);

// Creating winston logger
winston.loggers.add("winston", {
    level: "debug",
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.splat(),
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.colorize(),
                consoleFormat
            ),
        }),
        new winston.transports.File({
            level: "warn",
            filename: 'logs.log',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                winston.format.errors({ stack: true }),
                winston.format.uncolorize(),
                logFileFormat,
            ),
        })
    ]
})

// For easy export
const logger = winston.loggers.get('winston');

// Creating morgan logger
const http = morgan('dev', {
    stream: {
        write(msg) {
            logger.info(msg.substr(0, msg.lastIndexOf('\n')));
        }
    }
})

// Exporting loggers
module.exports = {
    httploger: http,
    nodelogger: logger,
}
