import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddFieldProjectIdInUsers1616448478080 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('usuarios', new TableColumn({
            name: 'projectId',
            type: 'uuid',
            isNullable: true,
        }));
        await queryRunner.createForeignKey('usuarios', new TableForeignKey({
            name: 'UsuariosProjetos',
            columnNames: ['projectId'],
            referencedTableName: 'projetos',
            referencedColumnNames: ['id'],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('usuarios', 'UsuariosProjetos');
        await queryRunner.dropColumn('usuarios', 'projectId');
    }

}
