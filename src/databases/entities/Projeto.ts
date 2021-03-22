import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projetos')
class Projeto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  tipo: string;
}

export default Projeto;
