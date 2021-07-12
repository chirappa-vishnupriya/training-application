import {inject} from '@loopback/core';
import {WinstonLogger} from '@loopback/logging';
import {
  HttpErrors,
  MiddlewareSequence,
  Reject,
  RequestContext,
  SequenceActions,
} from '@loopback/rest';

export class MySequence extends MiddlewareSequence {
  @inject('LOGGER.INJECT')
  private logger: WinstonLogger;

  @inject(SequenceActions.REJECT) public reject: Reject;
  async handle(context: RequestContext) {
    this.logger.info(
      ` ${context.request.headers.origin} ${context.request.headers['user-agent']}  ${context.request.ip}`,
    ); //context.request.headers.origin
    try {
      const ALLOWED_ORIGIN: any = process.env.ALLOWED_ORIGIN;
      if (
        !(
          ALLOWED_ORIGIN?.includes(context.request.headers.origin) ||
          ALLOWED_ORIGIN?.includes(context.request.headers.host)
        )
      ) {
        throw new HttpErrors.InternalServerError('Cors Request failed');
      }
      await super.handle(context);
    } catch (error) {
      this.logger.error(error.statusCode + ' - ' + error.message);
      this.reject(context, error.message);
    }

    this.logger.info('Ended');
  }
}
