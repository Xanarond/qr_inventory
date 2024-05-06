import { ApiProperty } from '@nestjs/swagger';

export class userDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  roleId: number;
}
