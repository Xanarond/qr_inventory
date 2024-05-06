import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { RedisModule } from '../redis/redis.module';
import { RolesEntity } from './entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RolesEntity]), RedisModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
