import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { OrderTypeEnum } from '../../application/enum';
import { EntityNotFoundException } from '../../application/exceptions/not_found.exception';
import { BrandEntity } from './entity';
import { BrandOrderByEnum, BrandStatusEnum } from './enum';
import { CreateBrandInput } from './input/create_brand.input';
import { BrandFilterInput } from './input/filter.input';
import { BrandPaginationInput } from './input/pagination.input';
import { UpdateBrandInput } from './input/update_brand.input';
import { BrandRepository } from './repository';

@Injectable()
export class BrandService {
  private readonly logger = new Logger('BrandService', { timestamp: true });

  constructor(private readonly repository: BrandRepository) {}

  async getBrand(brand_id: number, entityManager?: EntityManager): Promise<BrandEntity | null> {
    return this.repository.getTransaction(brand_id, entityManager);
  }

  async listBrands(
    filter: BrandFilterInput,
    pagination: BrandPaginationInput,
  ): Promise<BrandEntity[]> {
    const {
      offset = 0,
      limit = 20,
      orderBy = BrandOrderByEnum.updatedAt,
      orderType = OrderTypeEnum.DESC,
    } = pagination;
    const order = {};
    switch (orderBy) {
      case BrandOrderByEnum.updatedAt:
        order['updatedAt'] = orderType;
        break;

      default:
        break;
    }
    return this.repository.find({
      skip: offset,
      take: limit,
      order,
      where: filter,
    });
  }

  async countBrands(filter: BrandFilterInput): Promise<number> {
    return this.repository.count({ where: filter });
  }

  async createBrand(input: CreateBrandInput, entityManager?: EntityManager): Promise<BrandEntity> {
    const entity = new BrandEntity();
    entity.name = input.name;
    entity.country = input.country;
    entity.status = input.status;
    return this.repository.insertTransaction(entity, entityManager);
  }

  async updateBrand(
    id: number,
    input: UpdateBrandInput,
    entityManager?: EntityManager,
  ): Promise<BrandEntity> {
    const { name, country } = input;
    const entity = await this.getBrand(id, entityManager);
    if (!entity) {
      throw new EntityNotFoundException();
    }
    if (name != null) {
      entity.name = name;
    }
    if (country != null) {
      entity.country = country;
    }
    await this.repository.updateTransaction(id, { name, country }, entityManager);
    return entity;
  }

  async activateBrand(id: number, entityManager?: EntityManager): Promise<BrandEntity> {
    const entity = await this.getBrand(id, entityManager);
    if (!entity) {
      throw new EntityNotFoundException();
    }
    entity.status = BrandStatusEnum.ACTIVE;
    const input = {
      status: BrandStatusEnum.ACTIVE,
    };
    await this.repository.updateTransaction(id, input, entityManager);
    return entity;
  }

  async deactivateBrand(id: number, entityManager?: EntityManager): Promise<BrandEntity> {
    const entity = await this.getBrand(id, entityManager);
    if (!entity) {
      throw new EntityNotFoundException();
    }
    entity.status = BrandStatusEnum.INACTIVE;
    const input = {
      status: BrandStatusEnum.INACTIVE,
    };
    await this.repository.updateTransaction(id, input, entityManager);
    return entity;
  }
}
