import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import User from './User';

@Entity('projetos')
class Projeto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  tipo: string;

  @OneToMany(() => User, user => user.project)
  users: User[];
}

export default Projeto;
