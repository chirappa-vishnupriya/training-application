import {Customer} from './../../models/customer.model';
import {CustomerRepository} from './../../repositories/customer.repository';
import {testdb} from './../fixtures/datasources/testdb.datasource';
export async function givenEmptyDatabase() {
  await new CustomerRepository(testdb).deleteAll();
}

export function givenCustomerData(data?: Omit<Customer, 'id'> | Customer) {
  return Object.assign(
    {
      id: '1',
      name: 'CUSTOMER1',
      website: 'http://sample.com',
      address: 'Hyderabad',
    },
    data,
  );
}

export async function givenCustomer(data?: Partial<Customer>) {
  return new CustomerRepository(testdb).create(givenCustomerData(data));
}
