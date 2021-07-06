import {Customer} from '../../models';
import {givenCustomer, givenCustomerData} from '../helpers/database.helpers';

describe('Customer Controller (integration)', () => {
  describe('Saving data in customer table', () => {
    for (let i = 0; i < 10000; i++) {
      it('Create Customer.......', async () => {
        const customer: Partial<Customer> = givenCustomerData(new Customer({}));
        const details = await givenCustomer(customer);
      });
    }
  });
});
