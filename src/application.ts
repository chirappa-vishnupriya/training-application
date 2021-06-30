import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, extensionFor} from '@loopback/core';
import {
  LoggingBindings,
  LoggingComponent,
  WinstonFormat,
  WinstonTransports,
  WINSTON_TRANSPORT,
} from '@loopback/logging';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {format} from 'winston';
import {MySequence} from './sequence';
export {ApplicationConfig};
const myFormat: WinstonFormat = format((info, opts) => {
  console.log(info);
  return false;
})();

export class StarterApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/swagger',
    });

    this.configure(LoggingBindings.COMPONENT).to({
      enableFluent: true, // default to true
      enableHttpAccessLog: true, // default to true
    });

    this.configure(LoggingBindings.FLUENT_SENDER).to({
      host: process.env.FLUENTD_SERVICE_HOST ?? 'localhost',
      port: +(process.env.FLUENTD_SERVICE_PORT_TCP ?? 5000),
      timeout: 3.0,
      reconnectInterval: 600000, // 10 minutes
    });

    const consoleTransport = new WinstonTransports.Console({
      level: 'info',
      format: format.combine(format.colorize(), format.simple()),
    });
    this.bind('logging.winston.transports.console')
      .to(consoleTransport)
      .apply(extensionFor(WINSTON_TRANSPORT));

    this.component(RestExplorerComponent);
    this.component(LoggingComponent);
    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers', 'other_controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
function corsCheck(corsCheck: any) {
  throw new Error('Function not implemented.');
}
