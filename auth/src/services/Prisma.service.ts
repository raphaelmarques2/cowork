import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from './Config.service';

@Injectable()
export class PrismaService extends PrismaClient {
  url: string;
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: { url: config.DATABASE_URL },
      },
    });
    this.url = config.DATABASE_URL;
  }
}
