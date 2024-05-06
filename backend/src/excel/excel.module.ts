import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import { QRCodeModule } from '../qrcode/qrcode.module';
import { InventoryModule } from '../inventory/inventory.module';
import { InventoryService } from '../inventory/inventory.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    QRCodeModule,
    InventoryModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
  ],
  providers: [ExcelService, InventoryService],
  controllers: [ExcelController],
})
export class ExcelModule {}
