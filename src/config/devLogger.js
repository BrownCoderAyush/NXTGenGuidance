const {createLogger, format, transports} = require('winston');
const { combine, timestamp, label, printf} = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} ${label} [${level}]: ${message}`; // LOG FORMAT
});

const devLogger = () => {
    return createLogger({
        level: 'debug',
        format: combine(
            format.colorize({all:true}),
            label({ label: 'dev' }),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            myFormat
        ),
        transports: [
            new transports.Console() // ONLY PRINTING LOGS IN TERMINAL
            
        ]
    });
};   

module.exports = devLogger;