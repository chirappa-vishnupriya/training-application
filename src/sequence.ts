import {MiddlewareSequence, RequestContext} from '@loopback/rest';

export class MySequence extends MiddlewareSequence {
    async handle(context: RequestContext){
        console.log("*******************SEQUENCE*********************",context.request.url);
        await super.handle(context)
    }
}
