import { Global } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Global()
export class AppConfig {
  constructor() {
    dotenv.config({
      path: `${__dirname}/../../../.env`,
    });
  }
  get LOG_LEVEL(): string {
    return process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : 'info';
  }
  get PORT(): number {
    return Number(process.env.PORT || 3000);
  }
  get IS_DEVELOPMENT_MODE(): boolean {
    return process.env.IS_DEVELOPMENT_MODE == 'true';
  }
  get POSTGRES_HOST(): string {
    return process.env.POSTGRES_HOST;
  }
  get POSTGRES_PORT(): number {
    return Number(process.env.POSTGRES_PORT || 5432);
  }
  get POSTGRES_USERNAME(): string {
    return process.env.POSTGRES_USERNAME;
  }
  get POSTGRES_PASSWORD(): string {
    return process.env.POSTGRES_PASSWORD;
  }
  get POSTGRES_DB(): string {
    return process.env.POSTGRES_DB;
  }
  get POSTGRES_SCHEMA(): string {
    return process.env.POSTGRES_SCHEMA;
  }
  get POSTGRES_CONNECTION_TIMEOUT(): number {
    return Number(process.env.POSTGRES_CONNECTION_TIMEOUT);
  }
}

export const appConfig = new AppConfig();
