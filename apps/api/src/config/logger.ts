import winston, { format, config } from 'winston'

const formattedTimestamp = format.timestamp({
    format: "DD-MM-YYYY HH:mm:ss.SSS"
})

const colorizer = format.colorize({
  colors: config.npm.colors,
});

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        colorizer,
        formattedTimestamp,
        format.simple()
    ),
    transports: [new winston.transports.Console()]
})

export default logger;