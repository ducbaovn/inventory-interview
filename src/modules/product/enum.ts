import { registerEnumType } from '@nestjs/graphql';

export enum ProductOrderByEnum {
  updatedAt = 'updatedAt',
}
registerEnumType(ProductOrderByEnum, { name: 'ProductOrderByEnum' });

export enum ProductStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
registerEnumType(ProductStatusEnum, { name: 'ProductStatusEnum' });
