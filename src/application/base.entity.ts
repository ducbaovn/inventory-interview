import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
  })
  @Field()
  id?: number;

  @Column({
    name: 'created_by',
    type: 'varchar',
    length: 50,
    default: 'system',
  })
  @Field({ nullable: true })
  createdBy?: string;

  @Column({
    name: 'updated_by',
    type: 'varchar',
    length: 50,
    default: 'system',
  })
  updatedBy?: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  @Field({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt?: Date;
}
