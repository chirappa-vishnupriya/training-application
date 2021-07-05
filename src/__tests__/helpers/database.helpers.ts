import {CustomerRepository} from './../../repositories/customer.repository';
import {testdb} from './../fixtures/datasources/testdb.datasource';
export async function givenEmptyDatabase() {
  await new CustomerRepository(testdb).deleteAll();
}
