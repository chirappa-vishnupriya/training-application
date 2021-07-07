import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User, UserWithRelations} from './user.model';

@model({settings: {strict: true}})
export class Customer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id: number;

  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  name?: string;

  @property({
    type: 'string',
  })
  website?: string;

  @property({
    type: 'string',
  })
  address?: string;

  // @property({
  //   type: 'number',
  //   name: 'user_id',
  // })
  // userId: number;

  @belongsTo(() => User, {keyFrom: 'userId'}, {name: 'user_id'})
  userId?: number;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
  user?: UserWithRelations;
}

export type CustomerWithRelations = Customer & CustomerRelations;
