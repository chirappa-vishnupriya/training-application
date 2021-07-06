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
      const customer: Partial<Customer> = givenCustomerData(new Customer({}));

      const details = await givenCustomer(customer);
    });
    // }
  });

  describe('Finding count of customers ', async () => {
    const controller = new CustomerController(new CustomerRepository(testdb));
    const details = await controller.count({});
    expect(details.count).to.equal(20000);
  });
});
