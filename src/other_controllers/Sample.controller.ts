import {get} from '@loopback/rest';

export class SampleController {
  @get('/sample')
  sample(): object {
    return {
      samplemessage: 'Hello from new Path controller',
      date: new Date(),
    };
  }
}
