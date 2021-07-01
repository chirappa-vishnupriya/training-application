import {extensionFor} from '@loopback/core';
import {
  LoggingBindings,
  LoggingComponent,
  WinstonTransports,
  WINSTON_TRANSPORT,
} from '@loopback/logging';
import {format} from 'winston';
import {StarterApplication} from '../application';

export class LoggerCongfiguration {
  static consoleAppender(ctx: StarterApplication) {
    ctx.configure(LoggingBindings.COMPONENT).to({
      enableFluent: false, // default to true
      enableHttpAccessLog: false, // default to true
    });

    ctx.configure(LoggingBindings.FLUENT_SENDER).to({
      host: process.env.FLUENTD_SERVICE_HOST ?? 'localhost',
      port: +(process.env.FLUENTD_SERVICE_PORT_TCP ?? 5000),
      timeout: 3.0,
      reconnectInterval: 600000, // 10 minutes
    });

    const consoleTransport = new WinstonTransports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(info => {
          return `${info.level}: [${info.timestamp}] - ${info.message}`;
        }),
      ),
    });
    ctx
      .bind('logging.winston.transports.console')
      .to(consoleTransport)
      .apply(extensionFor(WINSTON_TRANSPORT));

    ctx.component(LoggingComponent);
  }
}
