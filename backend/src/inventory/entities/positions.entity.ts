import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('positions')
export class PositionsEntity {
  @PrimaryGeneratedColumn({ name: 'N п/п' })
  id: number;

  @Column()
  objectName: string;

  @Column({
    name: 'Номер (код) объекта учета',
    unique: true,
    nullable: true,
  })
  inventoryNum: string;

  @Column({ unique: true })
  qrCode: string;
}
