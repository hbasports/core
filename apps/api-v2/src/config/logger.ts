import { WinstonModule } from 'nest-winston';
import winston from 'winston';
const { combine, timestamp, printf, colorize, align } = winston.format;

export const winstonLogger = WinstonModule.createLogger({
  level: 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'DD-MM-YYYY hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports: [new winston.transports.Console()],
});
