/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  customDatabaseUrl?: string;

  get PORT(): number {
    return (process.env.PORT && Number(process.env.PORT)) || 3000;
  }

  get DATABASE_URL(): string {
    return this.customDatabaseUrl || process.env.DATABASE_URL!;
  }

  get JWT_SECRET(): string {
    return process.env.JWT_SECRET!;
  }

  get RABBITMQ_URL(): string {
    return process.env.RABBITMQ_URL!;
  }
  get RABBITMQ_QUEUE(): string {
    return process.env.RABBITMQ_QUEUE!;
  }
}
