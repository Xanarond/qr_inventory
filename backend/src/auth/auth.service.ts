import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as Bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../users/interfaces/user.inerface';
import { UserEntity } from '../users/entities/user.entity';
import { onMessage, onSuccess } from './auth.controller';
import { RedisService } from 'src/redis/redis.service';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  private redis: Redis;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient();
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user: UserEntity = await this.usersService.findByUsername(username);
    if (!user) {
      return null;
    }
    const isMatch: boolean = await Bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }
    return user;
  }

  async login({ username, password }: IUser): Promise<onSuccess> {
    const exUser: UserEntity = await this.usersService.findByUsername(username);
    if (!exUser || !Bcrypt.compareSync(password, exUser.password)) {
      throw new UnauthorizedException('Неверное имя пользователя или пароль!');
    }
    const payload: { username: string; roleId: number } = {
      username: exUser.username,
      roleId: exUser.roleId,
    };
    return {
      access_token: this.jwtService.sign(payload),
      ...payload,
    };
  }

  async logout(signature: string): Promise<void> {
    await this.redis.del(signature);
  }

  async register({
    password,
    roleId,
    username,
  }: IUser): Promise<{ message: string }> {
    const hashedPassword: string = await Bcrypt.hash(password, 10);
    const user: UserEntity = await this.usersService.findByUsername(username);

    if (user) {
      throw new ConflictException(
        'Пользователь с таким именем уже существует!',
      );
    } else {
      return await this.usersService
        .createUser({
          username,
          password: hashedPassword,
          roleId,
        })
        .then((): { message: string } => {
          return { message: 'Пользователь создан!' };
        });
    }
  }

  async cacheToken(signature: string, token: string): Promise<void> {
    await this.redis.set(signature, token);
  }

  async isTokenValid(token: string, signature: string): Promise<boolean> {
    const result = await this.redis.get(signature);
    return result === token;
  }

  private encryptToken(token: string): string {
    const key = crypto.scryptSync(token, 'salt', 32);
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(token, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  private decryptToken(encryptedToken: string): string {
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptedToken, iv);
    let decrypted = decipher.update(encryptedToken, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  }

  async getTokenFromRedis(signature: string): Promise<onMessage> {
    const result: string = await this.redis.get(signature);
    if (!result) {
      throw new UnauthorizedException('Токен пользователя отстуствует!');
    }
    return {
      message: 'Токен пользователя обнаружен! Пользователь авторизован!',
    };
  }
}
