import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  os?: string;

  @Field(() => Int, { nullable: true })
  memoryCapacity?: number;

  @Field(() => Int, { nullable: true })
  storageCapacity?: number;

  @Field(() => [String], { nullable: true })
  colors?: string[];

  @Field(() => Int, { nullable: true })
  yearOfManufacture?: number;

  @Field(() => Int, { nullable: true })
  brandId?: number;
}
