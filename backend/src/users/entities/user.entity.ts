import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RolesEntity } from './roles.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  roleId: number;

  @OneToMany(() => RolesEntity, (role) => role.users)
  @JoinColumn({ name: 'roleId' })
  role: RolesEntity;
}
