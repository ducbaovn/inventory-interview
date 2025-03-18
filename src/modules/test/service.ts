import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { appConfig } from '../../application/configs/app.config';

@Injectable()
export class TestService {
  constructor(private readonly datasource: DataSource) {}

  async clearDb() {
    const entities = this.datasource.entityMetadatas;
    const query = [];
    for (const entity of entities) {
      query.push(`TRUNCATE "${appConfig.POSTGRES_SCHEMA}".${entity.tableName} RESTART IDENTITY;`);
    }
    await this.datasource.query(query.join(''));
  }
}
