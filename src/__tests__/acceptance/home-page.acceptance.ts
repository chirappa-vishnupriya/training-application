import {Client} from '@loopback/testlab';
import {StarterApplication} from '../..';
import {setupApplication} from './test-helper';

describe('HomePage', () => {
  let app: StarterApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('exposes a default home page', async () => {
    // console.log(await client.get('/').expect(200));
    await client
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/plain/);
  });

  it('exposes self-hosted explorer', async () => {
    await client
      .get('/swagger/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .expect(/<title>LoopBack API Explorer/);
  });
});
