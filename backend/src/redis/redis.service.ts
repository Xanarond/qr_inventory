import { Injectable } from '@nestjs/common';
import * as Instance from 'ioredis';

@Injectable()
export class RedisService {
  private client: Instance.Redis;

  constructor() {
    try {
      this.client = new Instance.Redis({ host: 'inventory_redis', port: 6379 });
    } catch (error) {
      console.error('Ошибка подключения к Redis:', error);
    }
  }

  getClient(): Instance.Redis {
    return this.client;
  }
}
