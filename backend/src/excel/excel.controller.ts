import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ExcelService } from './excel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import FileUploadExcelDto, { ExcelFile } from './dto/excel.dto';

@Controller('excel')
@ApiTags('Работа с Excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('import')
  @HttpCode(200)
  @ApiOperation({ summary: 'Метод для импорта файла отчета в БД' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Входящий файл отчета форматов: .xlsx, .xlsm, .xlsb',
    type: FileUploadExcelDto,
  })
  async importFile(
    @UploadedFile() file: ExcelFile,
  ): Promise<{ success: boolean; message: string }> {
    return this.excelService.importExcel(file);
  }
}
