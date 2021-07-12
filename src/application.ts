import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {ConsoleLoggerComponent} from './components/console-logger.component';
import {SwaggerBindingComponent} from './components/swagger-binding.component';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class StarterApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.sequence(MySequence);
    this.component(SwaggerBindingComponent);
    // this.component(LoggingComponent);
    this.component(ConsoleLoggerComponent);
    this.static('/', path.join(__dirname, '../public'));

    // LoggerCongfiguration.consoleAppender(this);

    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers', 'other_controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
