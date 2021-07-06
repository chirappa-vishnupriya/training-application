import {expect} from '@loopback/testlab';
import {Customer} from '../../models';
import {CustomerRepository} from '../../repositories';
import {testdb} from '../fixtures/datasources/testdb.datasource';
import {givenCustomerData} from '../helpers/database.helpers';
import {CustomerController} from './../../controllers/customer.controller';

describe('Customer Controller (integration)', () => {
  describe('Saving data in customer table', () => {
    // for (let i = 0; i < 10; i++) {
    it('Create Customer.......', async () => {
      const customer: Partial<Customer> | any = givenCustomerData(
        new Customer({}),
      );
      const controller = new CustomerController(new CustomerRepository(testdb));
      const details = await controller.create(customer);
    });
    // }
  });

  describe('Finding count of customers ', () => {
    it('Create Customer.......', async () => {
      const controller = new CustomerController(new CustomerRepository(testdb));
      const details = await controller.count({});
      expect(details.count).to.equal(20003);
      should(details).property('count').equal(20004);
    });
  });
});
