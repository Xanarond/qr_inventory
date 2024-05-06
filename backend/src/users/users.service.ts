import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { IUser } from './interfaces/user.inerface';
import { DeepPartial, Repository } from 'typeorm';
import { RolesEntity } from './entities/roles.entity';
import * as Bcrypt from 'bcryptjs';
import * as process from 'process';

interface Role {
  id: number;
  name: string;
}

export interface Users {
  username: string;
  password: string;
  roleId?: number;
  role?: DeepPartial<RolesEntity>;
}

@Injectable()
export class UsersService {
  private roles: Role[] = [
    {
      id: 1,
      name: 'admin',
    },
    {
      id: 2,
      name: 'user',
    },
  ];

  private admin: IUser = {
    username: 'Administrator',
    password: Bcrypt.hashSync(process.env.ADMIN_PWD, 10).toString(),
    roleId: 1,
  };

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) {
    this.rolesRepository
      .save(this.roles)
      .then(() => this.usersRepository.upsert(this.admin, ['username']));
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async createUser(user: IUser): Promise<IUser> {
    return await this.usersRepository.save(user);
  }

  async createRole(role: Role): Promise<Role> {
    return await this.rolesRepository.save(role);
  }

  async findAllRoles() {
    return await this.usersRepository.find({ select: { id: true } });
  }

  async getUsers(): Promise<IUser[]> {
    return await this.usersRepository.find();
  }
}
