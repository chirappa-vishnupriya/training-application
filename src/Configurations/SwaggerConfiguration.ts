import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {StarterApplication} from '..';
export class SwaggerConfiguration {
  static config(ctx: StarterApplication) {
    ctx.configure(RestExplorerBindings.COMPONENT).to({
      path: '/swagger',
    });
    ctx.component(RestExplorerComponent);
  }
}
