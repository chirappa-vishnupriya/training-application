import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Customer, CustomerRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {
  public readonly user: BelongsToAccessor<User, typeof Customer.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserRepository')
    getUserRepository: Getter<UserRepository>,
  ) {
    super(Customer, dataSource);
    this.user = this.createBelongsToAccessorFor('user', getUserRepository);
  }
}
