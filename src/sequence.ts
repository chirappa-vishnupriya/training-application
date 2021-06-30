import {inject} from '@loopback/core';
import {LoggingBindings, WinstonLogger} from '@loopback/logging';
import {MiddlewareSequence, RequestContext} from '@loopback/rest';

export class MySequence extends MiddlewareSequence {
  @inject(LoggingBindings.WINSTON_LOGGER)
  private logger: WinstonLogger;
  async handle(context: RequestContext) {
    this.logger.debug(`reuesting from : ${context.request.headers.origin} `);
    if (process.env.ALLOWED_ORIGIN != context.request.headers.origin) {
      throw {messge: 'NOTALLOWED'};
      return;
    }
    await super.handle(context);
  }
}
