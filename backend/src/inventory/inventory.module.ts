import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryEntity } from './entities/inventory.entity';
import { PositionsEntity } from './entities/positions.entity';
import { InventoryService } from './inventory.service';
import { QRCodeService } from '../qrcode/qrcode.service';
import { InventoryController } from './inventory.controller';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryEntity, PositionsEntity]),
    UsersModule,
  ],
  controllers: [InventoryController],
  providers: [
    InventoryService,
    QRCodeService,
    AuthService,
    UsersService,
    JwtService,
    RedisService,
  ],
  exports: [TypeOrmModule],
})
export class InventoryModule {}
