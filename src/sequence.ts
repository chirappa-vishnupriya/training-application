import {inject} from '@loopback/core';
import {LoggingBindings, WinstonLogger} from '@loopback/logging';
import {
  HttpErrors,
  MiddlewareSequence,
  Reject,
  RequestContext,
  SequenceActions,
} from '@loopback/rest';

export class MySequence extends MiddlewareSequence {
  @inject(LoggingBindings.WINSTON_LOGGER)
  private logger: WinstonLogger;

  @inject(SequenceActions.REJECT) public reject: Reject;
  async handle(context: RequestContext) {
    this.logger.info(
      ` ${context.request.headers.referer} ${context.request.headers['user-agent']}  ${context.request.ip}`,
    );
    try {
      if (process.env.ALLOWED_ORIGIN != context.request.headers.origin) {
        throw new HttpErrors.InternalServerError('You Are Not Allowed');
      }
      await super.handle(context);
    } catch (error) {
      console.log(error);
      this.logger.error(error);
      this.reject(context, error);
    }

    this.logger.info('Ended');
  }
}
