import {StarterApplication} from '../application';
import {DbDataSource} from './../datasources/db.datasource';

export class DataBaseConfiguration {
  static config(ctx: StarterApplication) {
    ctx.bind('datasources.config.db').to({
      name: 'db',
      connector: 'postgres',
      hostname: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    ctx.bind('datasources.db').toClass(DbDataSource);
  }
}
