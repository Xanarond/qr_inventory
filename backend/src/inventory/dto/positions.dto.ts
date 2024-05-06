import { ApiProperty } from '@nestjs/swagger';

export class PositionsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  objectName: string;

  @ApiProperty()
  inventoryNum: string;

  @ApiProperty()
  qrCode: string;
}
