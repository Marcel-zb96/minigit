/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createLogger, format, transports } from 'winston';

const customFormat = format.printf(({ timestamp, level, stack, message }) => {
  return `${timestamp} - [${level.toUpperCase()}] - ${stack || message}`;
});

const options = {
  file: {
    filename: 'error.log',
    level: 'error',
  },
  console: {
    level: 'silly',
  },
};

const devLogger = {
  level: 'info',
  format: format.combine(format.timestamp(), format.errors({ stack: true }), customFormat),
  transports: [new transports.Console(options.console)],
};

export const instance = createLogger(devLogger);
