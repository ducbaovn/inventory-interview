import { registerEnumType } from '@nestjs/graphql';

export enum OrderTypeEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}
registerEnumType(OrderTypeEnum, { name: 'OrderTypeEnum' });
