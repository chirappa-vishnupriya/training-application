import {Client} from '@loopback/testlab';
import {StarterApplication} from '../..';
import {setupApplication} from './test-helper';

describe('Customer', () => {
  let app: StarterApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('exposes a data retrive of customer', async () => {
    // console.log(await client.get('/'));
    await client
      .get('/customers')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .type('array');
  });
});
