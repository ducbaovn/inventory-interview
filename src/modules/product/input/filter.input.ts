import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductStatusEnum } from '../enum';

@InputType()
export class ProductFilterInput {
  @Field(() => Int, { nullable: true })
  brandId?: number;

  @Field(() => ProductStatusEnum, { nullable: true })
  status?: ProductStatusEnum;
}
