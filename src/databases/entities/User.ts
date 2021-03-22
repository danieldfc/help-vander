import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;
}

export default User;
