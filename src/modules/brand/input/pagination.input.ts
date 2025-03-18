import { Field, InputType, Int } from '@nestjs/graphql';
import { OrderTypeEnum } from '../../../application/enum';
import { BrandOrderByEnum } from '../enum';

@InputType()
export class BrandPaginationInput {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset?: number;

  @Field(() => Int, { nullable: true, defaultValue: 20 })
  limit?: number;

  @Field(() => BrandOrderByEnum, { nullable: true, defaultValue: BrandOrderByEnum.updatedAt })
  orderBy?: BrandOrderByEnum;

  @Field(() => OrderTypeEnum, { nullable: true, defaultValue: OrderTypeEnum.DESC })
  orderType?: OrderTypeEnum;
}
