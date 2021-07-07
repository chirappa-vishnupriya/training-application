import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Customer, User, UserRelations} from '../models';
import {CustomerRepository} from './customer.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  private readonly customer: HasOneRepositoryFactory<
    Customer,
    typeof User.prototype.id
  >;

  private readonly customers: HasManyRepositoryFactory<
    Customer,
    typeof User.prototype.id
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('CustomerRepository')
    getCustomerRepository: Getter<CustomerRepository>,
  ) {
    super(User, dataSource);
    this.customer = this.createHasOneRepositoryFactoryFor(
      'customer',
      getCustomerRepository,
    );
    this.customers = this.createHasManyRepositoryFactoryFor(
      'customers',
      getCustomerRepository,
    );
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
    this.registerInclusionResolver(
      'customers',
      this.customers.inclusionResolver,
    );
  }
}
