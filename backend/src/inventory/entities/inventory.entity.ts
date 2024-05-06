import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inventory')
export class InventoryEntity {
  @PrimaryGeneratedColumn({ name: 'N п/п' })
  id: number;

  @Column()
  objectName: string;

  @Column({
    name: 'Номер (код) объекта учета (инвентарный или иной)',
    unique: true,
  })
  inventoryNum: string;

  @Column({
    name: 'Единица измерения',
    nullable: true,
  })
  countUnit: string;

  @Column({
    nullable: true,
    type: 'float',
  })
  estimatedCost: string;

  @Column({
    name: 'количество',
    nullable: true,
  })
  count: number;

  @Column({ name: 'сумма, руб.', nullable: true, type: 'float' })
  sum: string;

  @Column({ name: 'статус объекта учета', nullable: true })
  status: string;

  @Column({ name: 'целевая функция актива', nullable: true })
  activeFunction: string;

  @Column({ name: 'номер (код) счета', nullable: true })
  code: string;

  @Column({
    name: 'количество номинальное',
    nullable: true,
  })
  countNominal: number;

  @Column({
    name: 'балансовая стоимость, руб',
    nullable: true,
    type: 'float',
  })
  balanceCount: string;

  @Column({
    name: 'недосдача, количество',
    nullable: true,
  })
  shortageCount: number;

  @Column({
    name: 'недосдача, сумма',
    nullable: true,
    type: 'float',
  })
  shortageSum: string;

  @Column({
    name: 'излишки, количество',
    nullable: true,
  })
  surplusCount: number;

  @Column({
    name: 'излишки, сумма',
    nullable: true,
    type: 'float',
  })
  surplusSum: string;

  @Column({
    name: 'несоответствие, количество',
    nullable: true,
  })
  noConditionCount: number;

  @Column({
    name: 'несоответствие, сумма',
    nullable: true,
    type: 'float',
  })
  noConditionSum: string;

  @Column({ name: 'Примечания', nullable: true })
  notes: string;
}
