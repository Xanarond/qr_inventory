import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDtoLoginRequest {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class AuthDtoLoginResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  @IsOptional()
  roleId?: number;
}

export class AuthDtoLoginResponseFailure {
  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}

export class AuthDtoRegisterRequest {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  roleId: number;
}

export class AuthDtoRegisterResponse {
  @ApiProperty()
  message: string;
}

export class AuthDtoRegisterResponseFailure {
  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}

export class AuthDtoLogoutRequest {
  @ApiProperty()
  username: string;

  @ApiProperty()
  roleId: number;
}

export class AuthDtoLogoutResponseFailure {
  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}

export class AuthDtoLogoutResponse {
  @ApiProperty()
  message: string;
}
