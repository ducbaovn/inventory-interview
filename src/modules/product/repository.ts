import { Injectable } from '@nestjs/common';
import { isNil, omitBy } from 'lodash';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ProductEntity } from './entity';
import { ProductStatusEnum } from './enum';

export interface IUpdateProduct {
  brand_id?: number;
  status?: ProductStatusEnum;
  name?: string;
  os?: string;
  memoryCapacity?: number;
  storageCapacity?: number;
  color?: string;
  yearOfManufacture?: number;
}

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(private dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  async getTransaction(id: number, entityManager?: EntityManager): Promise<ProductEntity> {
    const repo = entityManager ? entityManager.getRepository(ProductEntity) : this;
    return repo.findOneBy({ id });
  }

  async insertTransaction(
    entity: ProductEntity,
    entityManager?: EntityManager,
  ): Promise<ProductEntity> {
    const repo = entityManager ? entityManager.getRepository(ProductEntity) : this;
    await repo.insert(entity);

    return entity;
  }

  async updateTransaction(
    id: number,
    input: IUpdateProduct,
    entityManager?: EntityManager,
  ): Promise<void> {
    const repo = entityManager ? entityManager.getRepository(ProductEntity) : this;
    await repo.update({ id }, omitBy(input, isNil));
  }
}
