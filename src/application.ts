import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {LoggerCongfiguration} from './Configurations/LoggerConfiguration';
import {SwaggerConfiguration} from './Configurations/SwaggerConfiguration';
import {MySequence} from './sequence';
export {ApplicationConfig};

export class StarterApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.sequence(MySequence);

    this.static('/', path.join(__dirname, '../public'));

    SwaggerConfiguration.config(this);
    LoggerCongfiguration.consoleAppender(this);
    // DataBaseConfiguration.config(this);

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
