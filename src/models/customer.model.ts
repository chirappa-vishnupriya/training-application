import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
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

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
