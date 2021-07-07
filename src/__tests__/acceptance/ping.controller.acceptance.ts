import {Client, expect} from '@loopback/testlab';
import {StarterApplication} from '../..';
import {setupApplication} from './test-helper';

describe('PingController', () => {
  let app: StarterApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /ping', async () => {
    const res = await client.get('/ping?msg=world').expect(200);
    expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
  });
});
