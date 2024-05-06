import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { FormatData, InventoryService } from './inventory.service';
import { InventoryEntity } from './entities/inventory.entity';
import { PositionsEntity } from './entities/positions.entity';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PositionsDto } from './dto/positions.dto';
import { InventoryDto, InventoryUpdateDto } from './dto/inventory.dto';
import { onMessage } from '../auth/auth.controller';

interface IRequest {
  headers: {
    authorization: string;
  };
}

@Controller('inventory')
@ApiTags('Коллекции обьектов')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('positions')
  @HttpCode(200)
  @ApiOperation({ summary: 'Метод получения всех позиций с QR кодами' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
    status: 200,
    type: PositionsDto,
    isArray: true,
  })
  async getPositions(@Request() req: IRequest): Promise<PositionsEntity[]> {
    const bearerToken: string | undefined =
      req.headers?.authorization?.split(' ')[1];

    if (!bearerToken) {
      throw new UnauthorizedException('Токен авторизации обязателен!');
    }

    return await this.inventoryService.getAllPos();
  }

  @Get('inventories')
  @HttpCode(200)
  @ApiOperation({ summary: 'Метод получения всех предметов бух учета' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
    status: 200,
    type: InventoryDto,
    isArray: true,
  })
  async getFullInventory(@Request() req: IRequest): Promise<InventoryEntity[]> {
    const bearerToken: string | undefined =
      req.headers?.authorization?.split(' ')[1];

    if (!bearerToken) {
      throw new UnauthorizedException('Токен авторизации обязателен!');
    }
    return await this.inventoryService.getAllInventory();
  }

  @Post('update')
  @ApiOperation({ summary: 'Метод обновления расчетов в таблице Inventory' })
  @ApiBody({ type: InventoryUpdateDto })
  async updateTableStatus(@Body() body: FormatData): Promise<void> {
    return await this.inventoryService.updateTable(body);
  }

  @Delete('clear')
  @HttpCode(200)
  @ApiOperation({ summary: 'Метод очищения таблиц' })
  async clearTables(): Promise<onMessage> {
    return this.inventoryService.clearAllTables();
  }

  @Get('inventory_item')
  @HttpCode(200)
  @ApiOperation({ summary: 'Метод получения данных по одной вещи' })
  @ApiQuery({ name: 'inventoryNum', type: String })
  @ApiResponse({
    status: 200,
    type: InventoryDto,
  })
  async getInventoryItem(
    @Query() query: { inventoryNum: string },
  ): Promise<InventoryEntity> {
    const num: string = query.inventoryNum;
    return this.inventoryService.getOneItem(num);
  }
}
