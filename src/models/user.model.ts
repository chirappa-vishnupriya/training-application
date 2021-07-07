import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Customer, CustomerWithRelations} from './customer.model';

@model({settings: {strict: true}, name: 'users'})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    name: 'firstname',
  })
  firstName: string;

  @property({
    type: 'string',
  })
  middleName?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  role?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'date',
    name: 'created_on',
  })
  createdOn: Date;

  @property({
    type: 'date',
    name: 'modified_on',
  })
  modifiedOn: Date;

  @hasOne(() => Customer, {keyTo: 'userId'})
  customer: Customer;

  @hasMany(() => Customer, {keyTo: 'userId'})
  customers: Customer[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
  customer?: CustomerWithRelations;
}

export type UserWithRelations = User & UserRelations;
