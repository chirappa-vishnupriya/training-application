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
    ); //context.request.headers.origin
    try {
      const ALLOWED_ORIGIN: any = process.env.ALLOWED_ORIGIN;
      console.log(context.request.headers);
      this.logger.info(
        `origin url print.....................${context.request.headers.origin}  ,   ${ALLOWED_ORIGIN}`,
      );
      console.log(ALLOWED_ORIGIN.includes(context.request.headers.origin));
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
