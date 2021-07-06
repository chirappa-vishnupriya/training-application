import {Customer} from '../../models';
import {CustomerRepository} from '../../repositories';
import {testdb} from '../fixtures/datasources/testdb.datasource';
import {givenCustomerData} from '../helpers/database.helpers';
import {CustomerController} from './../../controllers/customer.controller';

describe('Customer Controller (integration)', () => {
  describe('Saving data in customer table', () => {
    for (let i = 0; i < 10000; i++) {
      it('Create Customer.......', async () => {
        const customer: Omit<Customer, 'id'> = givenCustomerData(
          new Customer({}),
        );
        const controller = new CustomerController(
          new CustomerRepository(testdb),
        );
        const details = await controller.create(customer);
      });
    }
  });

  describe('Finding count of customers ', async () => {});
});
