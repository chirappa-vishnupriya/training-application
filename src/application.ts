import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {LoggerServiceCongfiguration} from './Configurations/LoggerServiceConfiguration';
import {SwaggerServiceConfiguration} from './Configurations/SwaggerServiceConfiguration';
import {MySequence} from './sequence';
export {ApplicationConfig};

export class StarterApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.sequence(MySequence);

    this.static('/', path.join(__dirname, '../public'));

    SwaggerServiceConfiguration.config(this);
    LoggerServiceCongfiguration.consoleAppender(this);

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
