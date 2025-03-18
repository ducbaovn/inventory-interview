import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './entity';
import { BrandRepository } from './repository';
import { BrandResolver } from './resolver';
import { BrandService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  providers: [BrandService, BrandRepository, BrandResolver],
  controllers: [],
  exports: [BrandService],
})
export class BrandModule {}
