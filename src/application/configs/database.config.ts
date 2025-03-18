import { DataSourceOptions } from 'typeorm';
import { appConfig } from './app.config';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: appConfig.POSTGRES_HOST,
  port: Number(appConfig.POSTGRES_PORT),
  username: appConfig.POSTGRES_USERNAME,
  password: appConfig.POSTGRES_PASSWORD,
  database: appConfig.POSTGRES_DB,
  schema: appConfig.POSTGRES_SCHEMA,
  entities: [__dirname + '/../../**/*entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: appConfig.IS_DEVELOPMENT_MODE,
  migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
  connectTimeoutMS: appConfig.POSTGRES_CONNECTION_TIMEOUT,
};

export = databaseConfig;
