import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Projeto from './Projeto';

@Entity('usuarios')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  projectId: string;

  @ManyToOne(() => Projeto, project => project.users)
  project: Projeto;
}

export default User;
