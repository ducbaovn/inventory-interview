import { Field, InputType } from '@nestjs/graphql';
import { BrandStatusEnum } from '../enum';

@InputType()
export class CreateBrandInput {
  @Field()
  name: string;

  @Field()
  country: string;

  @Field(() => BrandStatusEnum)
  status: BrandStatusEnum;
}
