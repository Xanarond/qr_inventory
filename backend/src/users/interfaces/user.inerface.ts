import { DeepPartial } from 'typeorm';
import { RolesEntity } from '../entities/roles.entity';

export interface IUser {
  id?: number;
  username: string;
  password: string;
  roleId?: number;
  role?: DeepPartial<RolesEntity>;
}
