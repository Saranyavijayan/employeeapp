import {MigrationInterface, QueryRunner} from "typeorm";

export class newmigration1659353495125 implements MigrationInterface {
    name = 'newmigration1659353495125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "created_at"`);
    }

}
