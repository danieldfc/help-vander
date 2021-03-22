import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProjetos1616447581271 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'projetos',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    generationStrategy: 'uuid',
                    isPrimary: true,
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'tipo',
                    type: 'varchar',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('projetos');
    }

}
