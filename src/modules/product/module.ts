import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandModule } from '../brand/module';
import { ProductEntity } from './entity';
import { ProductRepository } from './repository';
import { ProductResolver } from './resolver';
import { ProductService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), BrandModule],
  providers: [ProductService, ProductRepository, ProductResolver],
  controllers: [],
  exports: [ProductService],
})
export class ProductModule {}
