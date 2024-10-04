import { QRCodeService } from '../qrcode/qrcode.service';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity } from './entities/inventory.entity';
import { In, Repository } from 'typeorm';
import { PositionsEntity } from './entities/positions.entity';
import { Inventory } from '../excel/excel.service';

export interface Position {
  id: number;
  objectName: string;
  inventoryNum: string;
  qrCode: string;
}

export interface FormatData {
  count: number;
  codes: string[];
}

export class InventoryService {
  constructor(
    private readonly qrCodeService: QRCodeService,
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
    @InjectRepository(PositionsEntity)
    private readonly positionRepository: Repository<PositionsEntity>,
  ) {}

  async addItems(item: Inventory[]) {
    try {
      console.log(item)
      await this.inventoryRepository.save(item);
      await this.insertQr(item);
    } catch (error) {
      return error;
    }
  }

  async insertQr(inventories: Inventory[]) {
    const positions: Position[] = [];
    for (const inventory of inventories) {
      positions.push({
        id: inventory.id,
        objectName: inventory.objectName,
        inventoryNum: inventory.inventoryNum,
        qrCode: await this.qrCodeService.generateQrCode(inventory.inventoryNum),
      });
    }
    for (const inventory of positions) {
      try {
        await this.positionRepository.save(inventory);
      } catch (error) {
        return error;
      }
    }
  }

  async getAllPos(): Promise<PositionsEntity[]> {
    try {
      return await this.positionRepository.find();
    } catch (e) {
      return e;
    }
  }

  async getAllInventory(): Promise<InventoryEntity[]> {
    return await this.inventoryRepository.find();
  }

  async updateTable(formData: FormatData) {
    const inventories = await this.inventoryRepository.find({
      where: { inventoryNum: In(formData.codes.splice(1)) },
    });
    const inventoryMod: InventoryEntity[] = [];
    inventories.map(async (val: InventoryEntity): Promise<void> => {
      if (Number(formData.count) === val.countNominal) {
        val.estimatedCost = val.balanceCount;
        val.count = Number(formData.count);
        val.sum = (
          Number(val.balanceCount) * Number(formData.count)
        ).toString();
        val.shortageCount = 0;
        val.shortageSum = String(0);
        val.surplusCount = 0;
        val.surplusSum = String(0);
        inventoryMod.push(val);
      }
      if (Number(formData.count) < val.countNominal) {
        val.estimatedCost = val.balanceCount;
        val.count = Number(formData.count);
        val.sum = (
          Number(val.balanceCount) * Number(formData.count)
        ).toString();
        val.shortageCount = val.countNominal - Number(formData.count);
        val.shortageSum = (
          val.countNominal * Number(val.balanceCount) -
          Number(val.sum)
        )
          .toFixed(2)
          .toString();
        val.surplusCount = 0;
        val.surplusSum = String(0);
        inventoryMod.push(val);
      }
      if (Number(formData.count) > val.countNominal) {
        val.estimatedCost = val.balanceCount;
        val.count = formData.count;
        val.sum = (Number(val.balanceCount) * Number(formData.count))
          .toFixed(2)
          .toString();
        val.shortageCount = val.count - val.countNominal;
        val.shortageSum = (
          val.countNominal * Number(val.balanceCount) -
          Number(val.sum)
        )
          .toFixed(2)
          .toString();
        val.surplusCount = val.count - val.countNominal;
        val.surplusSum = (
          Number(val.sum) -
          val.countNominal * Number(val.balanceCount)
        )
          .toFixed(2)
          .toString();
        inventoryMod.push(val);
      }
      await this.inventoryRepository.save(inventoryMod);
    });
  }

  async clearAllTables() {
    await this.positionRepository.clear();
    await this.positionRepository.query(
      'ALTER SEQUENCE "inventory_N п/п_seq" RESTART 1;',
    );
    await this.inventoryRepository.clear();
    await this.positionRepository.query(
      'ALTER SEQUENCE "positions_N п/п_seq" RESTART 1;',
    );
    return { message: 'Таблицы очищены!' };
  }

  getOneItem(query: string) {
    return this.inventoryRepository.findOne({ where: { inventoryNum: query } });
  }
}
