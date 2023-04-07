import { Test } from '@nestjs/testing';
import { HttpServer, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigService } from 'src/services/Config.service';
import DBTester from './test/DBTester';
import { AppModule } from 'src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let config: ConfigService;
  let dbTester: DBTester;
  let server: HttpServer;

  beforeAll(async () => {
    config = new ConfigService();
    dbTester = new DBTester(config);
    await dbTester.beforeAll();
  });
  afterAll(async () => {
    await dbTester.afterAll();
  });

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue(config)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    server = app.getHttpServer();
  });

  it('/ (GET)', () => {
    return request(server)
      .get('/')
      .expect(200)
      .expect('Hello from auth service');
  });
});
