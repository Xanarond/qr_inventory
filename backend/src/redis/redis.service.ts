import { Injectable } from '@nestjs/common';
import * as Instance from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Instance.Redis;

  constructor() {
    this.client = new Instance.Redis();
  }

  getClient(): Instance.Redis {
    return this.client;
  }
}
