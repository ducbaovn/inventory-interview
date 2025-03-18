import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import { BrandEntity } from '../brand/entity';
import { BrandService } from '../brand/service';
import { ProductEntity } from './entity';
import { CreateProductInput } from './input/create_product.input';
import { ProductFilterInput } from './input/filter.input';
import { ProductPaginationInput } from './input/pagination.input';
import { UpdateProductInput } from './input/update_product.input';
import { ProductService } from './service';

@Resolver(() => ProductEntity)
export class ProductResolver {
  constructor(
    private service: ProductService,
    private brandService: BrandService,
    private dataSource: DataSource,
  ) {}

  @Query(() => ProductEntity)
  async product(@Args('id', { type: () => Int }) id: number): Promise<ProductEntity> {
    return this.service.getProduct(id);
  }

  @Query(() => [ProductEntity])
  async products(
    @Args('filter', { type: () => ProductFilterInput }) filter: ProductFilterInput,
    @Args('pagination', { type: () => ProductPaginationInput }) pagination: ProductPaginationInput,
  ): Promise<ProductEntity[]> {
    return this.service.listProducts(filter, pagination);
  }

  @Query(() => [ProductEntity])
  async countProducts(
    @Args('filter', { type: () => ProductFilterInput }) filter: ProductFilterInput,
  ): Promise<number> {
    return this.service.countProducts(filter);
  }

  @ResolveField('brand', () => BrandEntity)
  async getBrand(@Parent() product: ProductEntity): Promise<BrandEntity> {
    const { brandId, brand } = product;
    if (!brand) {
      return this.brandService.getBrand(brandId);
    }
    return brand;
  }

  @Mutation(() => ProductEntity)
  async createProduct(
    @Args({ name: 'input', type: () => CreateProductInput })
    input: CreateProductInput,
  ): Promise<ProductEntity> {
    return this.dataSource.transaction(async (manager) => {
      return this.service.createProduct(input, manager);
    });
  }

  @Mutation(() => ProductEntity)
  async updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args({ name: 'input', type: () => UpdateProductInput })
    input: UpdateProductInput,
  ): Promise<ProductEntity> {
    return this.dataSource.transaction(async (manager) => {
      return this.service.updateProduct(id, input, manager);
    });
  }

  @Mutation(() => ProductEntity)
  async activateProduct(@Args('id', { type: () => Int }) id: number): Promise<ProductEntity> {
    return this.dataSource.transaction(async (manager) => {
      return this.service.activateProduct(id, manager);
    });
  }

  @Mutation(() => ProductEntity)
  async deactivateProduct(@Args('id', { type: () => Int }) id: number): Promise<ProductEntity> {
    return this.dataSource.transaction(async (manager) => {
      return this.service.deactivateProduct(id, manager);
    });
  }
}
