import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx';
import { InventoryService } from '../inventory/inventory.service';
import { ExcelFile } from './dto/excel.dto';

export interface Inventory {
  id: number;
  objectName: string;
  inventoryNum: string;
  countUnit: string;
  estimatedCost: string;
  count: number;
  sum: string;
  status: string;
  activeFunction: string;
  code: string;
  countNominal: number;
  balanceCount: string;
  shortageCount: number;
  shortageSum: string;
  surplusCount: number;
  surplusSum: string;
  noConditionCount: number;
  noConditionSum: string;
  notes: string;
}

@Injectable()
export class ExcelService {
  constructor(private readonly inventoryService: InventoryService) { }

  async importExcel(
    file: ExcelFile,
  ): Promise<{ success: true; message: string }> {
    try {
      const workBook: WorkBook = XLSX.read(file.buffer, {
        type: 'buffer',
        cellDates: true,
      });
      console.log(workBook);
      const first_sheet: WorkSheet = workBook.Sheets[workBook.SheetNames[0]];
      const raw_data: any[][] = XLSX.utils.sheet_to_json(first_sheet, {
        header: 1,
        blankrows: false,
      });
      console.log('Raw data:', raw_data);

      const filteredArr: any[][] = raw_data.slice(5).slice(0, -2);
      const elements: Inventory[] = [];
      for (const object of filteredArr) {
        elements.push({
          id: object[0],
          objectName: object[1],
          inventoryNum: object[2],
          countUnit: object[3],
          estimatedCost: object[4] || null,
          count: object[5] || null,
          sum: object[6] || null,
          status: object[7] || null,
          activeFunction: object[8] || null,
          code: object[9] || null,
          countNominal: object[10] || null,
          balanceCount: object[11].toString().replace(',', '.') || null,
          shortageCount: null,
          shortageSum: null,
          surplusCount: null,
          surplusSum: null,
          noConditionCount: null,
          noConditionSum: null,
          notes: null,
        });
      }
      await this.inventoryService.addItems(elements);

      return {
        success: true,
        message: 'Файл успешно импортирован',
      };

    } catch (error) {
      console.error('Ошибка при чтении Excel файла:', error);
      throw new Error('Ошибка при обработке файла');
    }
  }
}
