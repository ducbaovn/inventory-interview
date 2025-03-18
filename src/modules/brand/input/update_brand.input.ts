import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBrandInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  country?: string;
}
