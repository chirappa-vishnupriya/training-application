import {inject} from '@loopback/core';
import {LoggingBindings, WinstonLogger} from '@loopback/logging';
import {MiddlewareSequence, RequestContext} from '@loopback/rest';

export class MySequence extends MiddlewareSequence {
  @inject(LoggingBindings.WINSTON_LOGGER)
  private logger: WinstonLogger;
  async handle(context: RequestContext) {
    // this.logger.info(`${context.request.url} `);
    await super.handle(context);
  }
}
