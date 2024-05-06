import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export type StatusMessage = {
  message: string;
  status: number;
};

@ApiTags('Проверка соединения')
@Controller()
export class AppController {
  @Get('status')
  @ApiOperation({ summary: 'Проверить состояние сервера' })
  @ApiResponse({
    status: 200,
    description: 'Ответ от сервера',
  })
  getHello(): StatusMessage {
    return { message: 'Inventory Backend is working!', status: 200 };
  }
}
