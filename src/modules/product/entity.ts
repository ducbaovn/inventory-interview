import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../application/base.entity';
import { BrandEntity } from '../brand/entity';
import { ProductStatusEnum } from './enum';

@Entity({
  name: 'products',
})
@Index(['brandId'], {
  background: true,
})
@ObjectType()
export class ProductEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  @Field()
  name: string;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 10,
  })
  @Field(() => ProductStatusEnum)
  status: ProductStatusEnum;

  @Column({
    name: 'os',
    type: 'varchar',
    length: 10,
  })
  @Field()
  os: string;

  @Column({
    name: 'memory_capacity',
    type: 'int',
  })
  @Field(() => Int)
  memoryCapacity: number;

  @Column({
    name: 'storage_capacity',
    type: 'int',
  })
  @Field(() => Int)
  storageCapacity: number;

  @Column({
    name: 'colors',
    type: 'varchar',
    length: 20,
    array: true,
  })
  @Field(() => [String])
  colors: string[];

  @Column({
    name: 'year_of_manufacture',
    type: 'int',
  })
  @Field(() => Int)
  yearOfManufacture: number;

  @Column({
    name: 'brand_id',
    type: 'int',
  })
  @Field(() => Int)
  brandId: number;

  @ManyToOne(() => BrandEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'brand_id',
  })
  @Field(() => BrandEntity)
  brand?: BrandEntity;
}
