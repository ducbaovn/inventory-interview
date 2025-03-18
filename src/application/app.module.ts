import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandModule } from '../modules/brand/module';
import { ProductModule } from '../modules/product/module';
import databaseConfig from './configs/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    forwardRef(() => BrandModule),
    forwardRef(() => ProductModule),
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {}
}
