import { registerEnumType } from '@nestjs/graphql';

export enum BrandOrderByEnum {
  updatedAt = 'updatedAt',
}
registerEnumType(BrandOrderByEnum, { name: 'BrandOrderByEnum' });

export enum BrandStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
registerEnumType(BrandStatusEnum, { name: 'BrandStatusEnum' });
