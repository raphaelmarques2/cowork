import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { ConfigService } from 'src/services/Config.service';
import { v4 } from 'uuid';

export default class DBTester {
  private dbUrl: string;
  public readonly schema: string;
  private testDbUrl: string;

  constructor(config: ConfigService) {
    this.schema = this.createSchemaName();
    // console.log(`test schema: ${this.schema}`);

    this.dbUrl = config.DATABASE_URL;

    const url = new URL(this.dbUrl);
    url.searchParams.set('schema', this.schema);
    this.testDbUrl = url.toString();

    config.customDatabaseUrl = this.testDbUrl;
  }

  private createSchemaName() {
    return v4()
      .replace('-', '')
      .replace('-', '')
      .replace('-', '')
      .replace('-', '');
  }

  async beforeAll() {
    const prisma = new PrismaClient({
      datasources: { db: { url: this.dbUrl } },
    });
    const createSchemaSql = `CREATE SCHEMA "${this.schema}";`;

    // console.log(`Running [${createSchemaSql}] on [${this.dbUrl}]`);

    await prisma.$executeRawUnsafe(createSchemaSql);
    await prisma.$disconnect();
    // console.log(`Schema created ${this.schema}`);

    execSync(
      `set DATABASE_URL=${this.testDbUrl} && npm run prisma:migrate:deploy --schema ./src/prisma/schema.prisma`,
    );
  }

  async afterAll() {
    const prisma = new PrismaClient({
      datasources: { db: { url: this.dbUrl } },
    });
    await prisma.$executeRawUnsafe(`DROP SCHEMA "${this.schema}" CASCADE;`);
    await prisma.$disconnect();
    // console.log(`schema dropped ${this.schema}`);
  }
}
