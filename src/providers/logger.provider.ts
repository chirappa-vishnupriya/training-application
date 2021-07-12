import {Provider, ValueOrPromise} from '@loopback/core';
const winston = require('winston');

export class LoggerProvider implements Provider<String> {
  constructor() {}
  value(): ValueOrPromise<any> {
    return winston.createLogger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
          format: 'MMM-DD-YYYY HH:mm:ss',
        }),
        winston.format.printf(
          (info: any) => `${info.level}: [${info.timestamp}] - ${info.message}`,
        ),
      ),
    });
  }
}
