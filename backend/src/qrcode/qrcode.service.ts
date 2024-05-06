import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QRCodeService {
  async generateQrCode(inventoryNum: string) {
    try {
      const url = `http://${process.env.HOST}:${process.env.CLIENT_PORT}/${inventoryNum}`;
      return await QRCode.toDataURL(url);
    } catch (e) {
      return e;
    }
  }
}
