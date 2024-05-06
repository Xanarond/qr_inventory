import { Controller, Get, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.inerface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { userDto } from './dto/user.dto';
import { AuthService } from '../auth/auth.service';

@Controller('users')
@ApiTags('Пользователи')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('get_all')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Метод для получения всех пользователей приложения',
  })
  @ApiResponse({
    status: 200,
    type: userDto,
  })
  async getAllUsers(): Promise<IUser[]> {
    return await this.usersService.getUsers();
  }
}
