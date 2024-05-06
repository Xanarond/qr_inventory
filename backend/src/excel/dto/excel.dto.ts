import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export interface ExcelFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: BufferSource;
}

export default class FileUploadExcelDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: ExcelFile;
}
