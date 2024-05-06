import {
  Body,
  Controller,
  Get,
  HttpCode,
  MethodNotAllowedException,
  Post,
  Query,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from '../users/interfaces/user.inerface';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AuthDtoLoginRequest,
  AuthDtoLoginResponse,
  AuthDtoLoginResponseFailure,
  AuthDtoLogoutRequest,
  AuthDtoLogoutResponse,
  AuthDtoLogoutResponseFailure,
  AuthDtoRegisterRequest,
  AuthDtoRegisterResponse,
  AuthDtoRegisterResponseFailure,
} from './dto/auth.dto';

export interface onSuccess {
  access_token: string;
  username: string;
  roleId: number;
}

export interface onMessage {
  message: string;
}

export interface RequestType {
  headers: { authorization: string };
  body: {
    roleId: string;
    username: string;
  };
}

@Controller('auth')
@ApiTags('Авторизация')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(200)
  @ApiOperation({ summary: 'Метод для обработки входа в приложение' })
  @ApiResponse({
    status: 200,
    type: AuthDtoLoginResponse,
  })
  @ApiResponse({
    status: 401,
    type: AuthDtoLoginResponseFailure,
    description: 'Ошибка неавторизованного пользователя',
  })
  @ApiBody({ type: AuthDtoLoginRequest })
  async signIn(@Body() user: IUser): Promise<onSuccess> {
    const result = await this.authService.login(user);
    await this.authService.cacheToken(
      `${result.roleId}:${result.username}`,
      result.access_token,
    );
    return result;
  }

  @Post('signup')
  @HttpCode(200)
  @ApiOperation({ summary: 'Метод для регистрации в приложении' })
  @ApiResponse({
    status: 200,
    type: AuthDtoRegisterResponse,
  })
  @ApiResponse({
    status: 409,
    type: AuthDtoRegisterResponseFailure,
    description: 'Ошибка совпадения логина',
  })
  @ApiBody({ type: AuthDtoRegisterRequest })
  async signuUp(@Body() auth: IUser): Promise<onMessage> {
    return await this.authService.register(auth);
  }

  @Post('logout')
  @HttpCode(200)
  @ApiOperation({ summary: 'Метод для выхода из приложения' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
    status: 200,
    type: AuthDtoLogoutResponse,
  })
  @ApiResponse({
    status: 405,
    type: AuthDtoLogoutResponseFailure,
    description: 'Ошибка отсутствия токена',
  })
  @ApiBody({ type: AuthDtoLogoutRequest })
  async logOut(@Request() req: RequestType): Promise<onMessage> {
    const token: string | undefined = req.headers.authorization?.replace(
      'Bearer ',
      '',
    );
    if (!token) {
      throw new MethodNotAllowedException('Токен пользователя отсутствует!');
    }
    const signature: string = `${req.body.roleId}:${req.body.username}`;
    if (await this.authService.isTokenValid(token, signature)) {
      await this.authService.logout(signature);
      return { message: 'Logout successful' };
    }
  }

  @Get('token')
  @ApiOperation({ summary: 'Метод для проверки актуальности токена' })
  @ApiQuery({ name: 'username', type: String })
  @ApiQuery({ name: 'roleId', type: Number })
  async getToken(
    @Query() params: { roleId: number; username: string },
  ): Promise<onMessage> {
    if (!params) {
      throw new UnauthorizedException('Пользователь не авторизован!');
    }
    const signature: string = `${params.roleId}:${params.username}`;
    return this.authService.getTokenFromRedis(signature);
  }
}
