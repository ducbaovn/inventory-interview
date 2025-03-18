import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../application/base.entity';
import { ProductEntity } from '../product/entity';
import { BrandStatusEnum } from './enum';

@Entity({
  name: 'brands',
})
@ObjectType()
export class BrandEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  @Field()
  name: string;

  @Column({
    name: 'country',
    type: 'varchar',
    length: 10,
  })
  @Field()
  country: string;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 10,
  })
  @Field(() => BrandStatusEnum)
  status: BrandStatusEnum;

  @OneToMany(() => ProductEntity, (product) => product.brand)
  products?: ProductEntity[];
}
