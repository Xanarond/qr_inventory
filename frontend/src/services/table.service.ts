import instance from './api';
import { FormatData } from '../stores/app';

export interface Position {
  id: number;
  objectName: string;
  inventoryNum: string;
  qrCode: string;
}

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

export interface UserUpdate {
  id: string;
  password: string;
  roleId: number;
  username: string;
}

class TableService {
  async getPositions(token: string, s: string): Promise<Position[]> {
    return await instance.get('inventory/positions', {
      headers: {
        Authorization: 'Bearer ' + token,
        Signature: s,
      },
    });
  }
  async getInventories(token: string, s: string): Promise<Inventory[]> {
    return await instance.get('inventory/inventories', {
      headers: {
        Authorization: 'Bearer ' + token,
        Signature: s,
      },
    });
  }

  async updatePosition(form: FormatData) {
    return await instance.post('inventory/update', form);
  }
  async updateUsers(users: UserUpdate[]) {
    return await instance.post('users/update', users);
  }
  async getAllusers(token: string, s: string) {
    return await instance.get('users/get_all', {
      headers: {
        Authorization: 'Bearer ' + token,
        Signature: s,
      },
    });
  }

  async clearTables() {
    return await instance.delete('inventory/clear');
  }

  async getInventory(code: string) {
    return await instance.get(`inventory/inventory_item?inventoryNum=${code}`);
  }
}

export default new TableService();
