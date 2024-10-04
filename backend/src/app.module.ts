import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { InventoryModule } from './inventory/inventory.module';
import { InventoryEntity } from './inventory/entities/inventory.entity';
import { RolesEntity } from './users/entities/roles.entity';
import { ExcelModule } from './excel/excel.module';
import { PositionsEntity } from './inventory/entities/positions.entity';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'inventory_postgres',
      port: 5432,
      username: 'root',
      password: '123456',
      database: 'inventory',
      synchronize: false,
      entities: [UserEntity, RolesEntity, InventoryEntity, PositionsEntity],
    }),
    InventoryModule,
    ExcelModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
