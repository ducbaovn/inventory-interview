import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import { BrandEntity } from './entity';
import { CreateBrandInput } from './input/create_brand.input';
import { BrandFilterInput } from './input/filter.input';
import { BrandPaginationInput } from './input/pagination.input';
import { UpdateBrandInput } from './input/update_brand.input';
import { BrandService } from './service';

@Resolver(() => BrandEntity)
export class BrandResolver {
  constructor(
    private service: BrandService,
    private dataSource: DataSource,
  ) {}

  @Query(() => BrandEntity)
  async brand(@Args('id', { type: () => Int }) id: number): Promise<BrandEntity> {
    return this.service.getBrand(id);
  }

  @Query(() => [BrandEntity])
  async brands(
    @Args('filter', { type: () => BrandFilterInput }) filter: BrandFilterInput,
    @Args('pagination', { type: () => BrandPaginationInput }) pagination: BrandPaginationInput,
  ): Promise<BrandEntity[]> {
    return this.service.listBrands(filter, pagination);
  }

  @Query(() => [BrandEntity])
  async countBrands(
    @Args('filter', { type: () => BrandFilterInput }) filter: BrandFilterInput,
  ): Promise<number> {
    return this.service.countBrands(filter);
  }

  @Mutation(() => BrandEntity)
  async createBrand(
    @Args({ name: 'input', type: () => CreateBrandInput })
    input: CreateBrandInput,
  ): Promise<BrandEntity> {
    return this.dataSource.transaction(async (manager) => {
      return this.service.createBrand(input, manager);
    });
  }

  @Mutation(() => BrandEntity)
  async updateBrand(
    @Args('id', { type: () => Int }) id: number,
    @Args({ name: 'input', type: () => UpdateBrandInput })
    input: UpdateBrandInput,
  ): Promise<BrandEntity> {
    return this.dataSource.transaction(async (manager) => {
      return this.service.updateBrand(id, input, manager);
    });
  }

  @Mutation(() => BrandEntity)
  async activateBrand(@Args('id', { type: () => Int }) id: number): Promise<BrandEntity> {
    return this.dataSource.transaction(async (manager) => {
      return this.service.activateBrand(id, manager);
    });
  }

  @Mutation(() => BrandEntity)
  async deactivateBrand(@Args('id', { type: () => Int }) id: number): Promise<BrandEntity> {
    return this.dataSource.transaction(async (manager) => {
      return this.service.deactivateBrand(id, manager);
    });
  }
}
