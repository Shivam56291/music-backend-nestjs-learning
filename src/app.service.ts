import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(
    private readonly devConfigService: DevConfigService,
    @Inject('CONFIG') private readonly config: { port: string },
  ) {}
  getHello(): string {
    return `Hello, I am learning NestJS! Fundamentalas ${this.devConfigService.getDBHost()}, Port = ${this.config.port}`;
  }
}
