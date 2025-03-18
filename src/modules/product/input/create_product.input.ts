import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductStatusEnum } from '../enum';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field(() => ProductStatusEnum)
  status: ProductStatusEnum;

  @Field()
  os: string;

  @Field(() => Int)
  memoryCapacity: number;

  @Field(() => Int)
  storageCapacity: number;

  @Field(() => [String])
  colors: string[];

  @Field(() => Int)
  yearOfManufacture: number;

  @Field(() => Int)
  brandId: number;
}
