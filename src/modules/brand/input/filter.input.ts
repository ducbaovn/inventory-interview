import { Field, InputType } from '@nestjs/graphql';
import { BrandStatusEnum } from '../enum';

@InputType()
export class BrandFilterInput {
  @Field(() => BrandStatusEnum, { nullable: true })
  status?: BrandStatusEnum;
}
