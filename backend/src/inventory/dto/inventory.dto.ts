import { ApiProperty } from '@nestjs/swagger';

export class InventoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  objectName: string;

  @ApiProperty()
  inventoryNum: string;

  @ApiProperty()
  countUnit: string;

  @ApiProperty()
  estimatedCost: string;

  @ApiProperty()
  count: number;

  @ApiProperty()
  sum: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  activeFunction: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  countNominal: number;

  @ApiProperty()
  balanceCount: string;

  @ApiProperty()
  shortageCount: number;

  @ApiProperty()
  shortageSum: string;

  @ApiProperty()
  surplusCount: number;

  @ApiProperty()
  surplusSum: string;

  @ApiProperty()
  noConditionCount: number;

  @ApiProperty()
  noConditionSum: string;

  @ApiProperty()
  notes: string;
}

export class InventoryUpdateDto {
  @ApiProperty()
  count: number;

  @ApiProperty({ isArray: true })
  codes: string[];
}
