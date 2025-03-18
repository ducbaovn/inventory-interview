import { Injectable } from '@nestjs/common';
import { isNil, omitBy } from 'lodash';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { BrandEntity } from './entity';
import { BrandStatusEnum } from './enum';

export interface IUpdateBrand {
  status?: BrandStatusEnum;
  name?: string;
  country?: string;
}

@Injectable()
export class BrandRepository extends Repository<BrandEntity> {
  constructor(private dataSource: DataSource) {
    super(BrandEntity, dataSource.createEntityManager());
  }

  async getTransaction(id: number, entityManager?: EntityManager): Promise<BrandEntity> {
    const repo = entityManager ? entityManager.getRepository(BrandEntity) : this;
    return repo.findOneBy({ id });
  }

  async insertTransaction(
    entity: BrandEntity,
    entityManager?: EntityManager,
  ): Promise<BrandEntity> {
    const repo = entityManager ? entityManager.getRepository(BrandEntity) : this;
    await repo.insert(entity);

    return entity;
  }

  async updateTransaction(
    id: number,
    input: IUpdateBrand,
    entityManager?: EntityManager,
  ): Promise<void> {
    const repo = entityManager ? entityManager.getRepository(BrandEntity) : this;
    await repo.update({ id }, omitBy(input, isNil));
  }
}
