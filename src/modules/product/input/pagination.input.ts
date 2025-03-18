import { Field, InputType, Int } from '@nestjs/graphql';
import { OrderTypeEnum } from '../../../application/enum';
import { ProductOrderByEnum } from '../enum';

@InputType()
export class ProductPaginationInput {
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset?: number;

  @Field(() => Int, { nullable: true, defaultValue: 20 })
  limit?: number;

  @Field(() => ProductOrderByEnum, { nullable: true, defaultValue: ProductOrderByEnum.updatedAt })
  orderBy?: ProductOrderByEnum;

  @Field(() => OrderTypeEnum, { nullable: true, defaultValue: OrderTypeEnum.DESC })
  orderType?: OrderTypeEnum;
}
