import {Component, CoreBindings, inject} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {StarterApplication} from '..';

export class SwaggerBindingComponent implements Component {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: StarterApplication,
  ) {
    app.configure(RestExplorerBindings.COMPONENT).to({
      path: '/swagger',
    });
    app.component(RestExplorerComponent);
  }
}
