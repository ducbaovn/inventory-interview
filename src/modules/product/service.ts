import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { OrderTypeEnum } from '../../application/enum';
import { EntityNotFoundException } from '../../application/exceptions/not_found.exception';
import { BrandService } from '../brand/service';
import { ProductEntity } from './entity';
import { ProductOrderByEnum, ProductStatusEnum } from './enum';
import { CreateProductInput } from './input/create_product.input';
import { ProductFilterInput } from './input/filter.input';
import { ProductPaginationInput } from './input/pagination.input';
import { UpdateProductInput } from './input/update_product.input';
import { ProductRepository } from './repository';

@Injectable()
export class ProductService {
  private readonly logger = new Logger('ProductService', { timestamp: true });

  constructor(
    private readonly repository: ProductRepository,
    private readonly brandService: BrandService,
  ) {}

  async getProduct(
    productId: number,
    entityManager?: EntityManager,
  ): Promise<ProductEntity | null> {
    return this.repository.getTransaction(productId, entityManager);
  }

  async listProducts(
    filter: ProductFilterInput,
    pagination: ProductPaginationInput,
  ): Promise<ProductEntity[]> {
    const {
      offset = 0,
      limit = 20,
      orderBy = ProductOrderByEnum.updatedAt,
      orderType = OrderTypeEnum.DESC,
    } = pagination;
    const order = {};
    switch (orderBy) {
      case ProductOrderByEnum.updatedAt:
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

  async countProducts(filter: ProductFilterInput): Promise<number> {
    return this.repository.count({ where: filter });
  }

  private async _validateBrand(brandId: number): Promise<void> {
    const brand = await this.brandService.getBrand(brandId);
    if (!brand) {
      throw new EntityNotFoundException('Brand not found');
    }
  }

  async createProduct(
    input: CreateProductInput,
    entityManager?: EntityManager,
  ): Promise<ProductEntity> {
    await this._validateBrand(input.brandId);
    const entity = new ProductEntity();
    entity.name = input.name;
    entity.status = input.status;
    entity.brandId = input.brandId;
    entity.os = input.os;
    entity.memoryCapacity = input.memoryCapacity;
    entity.storageCapacity = input.storageCapacity;
    entity.colors = input.colors;
    entity.yearOfManufacture = input.yearOfManufacture;
    return this.repository.insertTransaction(entity, entityManager);
  }

  async updateProduct(
    id: number,
    input: UpdateProductInput,
    entityManager?: EntityManager,
  ): Promise<ProductEntity> {
    const entity = await this.getProduct(id, entityManager);
    if (!entity) {
      throw new EntityNotFoundException();
    }
    if (input.name != null) {
      entity.name = input.name;
    }
    if (input.os != null) {
      entity.os = input.os;
    }
    if (input.brandId != null) {
      await this._validateBrand(input.brandId);
      entity.brandId = input.brandId;
    }
    if (input.colors != null) {
      entity.colors = input.colors;
    }
    if (input.memoryCapacity != null) {
      entity.memoryCapacity = input.memoryCapacity;
    }
    if (input.storageCapacity != null) {
      entity.storageCapacity = input.storageCapacity;
    }
    if (input.yearOfManufacture != null) {
      entity.yearOfManufacture = input.yearOfManufacture;
    }
    await this.repository.updateTransaction(id, input, entityManager);
    return entity;
  }

  async activateProduct(id: number, entityManager?: EntityManager): Promise<ProductEntity> {
    const entity = await this.getProduct(id, entityManager);
    if (!entity) {
      throw new EntityNotFoundException('Product not found');
    }
    entity.status = ProductStatusEnum.ACTIVE;
    const input = {
      id,
      status: ProductStatusEnum.ACTIVE,
    };
    await this.repository.updateTransaction(id, input, entityManager);
    return entity;
  }

  async deactivateProduct(id: number, entityManager?: EntityManager): Promise<ProductEntity> {
    const entity = await this.getProduct(id, entityManager);
    if (!entity) {
      throw new EntityNotFoundException('Product not found');
    }
    entity.status = ProductStatusEnum.INACTIVE;
    const input = {
      id,
      status: ProductStatusEnum.INACTIVE,
    };
    await this.repository.updateTransaction(id, input, entityManager);
    return entity;
  }
}
