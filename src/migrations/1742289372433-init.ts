import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1742289372433 implements MigrationInterface {
  name = 'Init1742289372433';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brands" ("id" SERIAL NOT NULL, "created_by" character varying(50) NOT NULL DEFAULT 'system', "updated_by" character varying(50) NOT NULL DEFAULT 'system', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(50) NOT NULL, "country" character varying(10) NOT NULL, "status" character varying(10) NOT NULL, CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "created_by" character varying(50) NOT NULL DEFAULT 'system', "updated_by" character varying(50) NOT NULL DEFAULT 'system', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(50) NOT NULL, "status" character varying(10) NOT NULL, "os" character varying(10) NOT NULL, "memory_capacity" integer NOT NULL, "storage_capacity" integer NOT NULL, "colors" character varying(20) array NOT NULL, "year_of_manufacture" integer NOT NULL, "brand_id" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1530a6f15d3c79d1b70be98f2b" ON "products" ("brand_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_1530a6f15d3c79d1b70be98f2b"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "brands"`);
  }
}
