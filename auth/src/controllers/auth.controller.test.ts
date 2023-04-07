import { Test } from '@nestjs/testing';
import {
  HttpServer,
  INestApplication,
  NotImplementedException,
} from '@nestjs/common';
import * as request from 'supertest';
import { ConfigService } from 'src/services/Config.service';
import { AppModule } from 'src/app.module';
import DBTester from 'src/test/DBTester';
import { UserDto } from 'src/application/dtos/UserDto';
import { Chance } from 'chance';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  let config: ConfigService;
  let dbTester: DBTester;
  let server: HttpServer;

  const chance = new Chance();

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

  describe('/auth/signup (POST)', () => {
    const path = '/auth/signup';
    it('should create user', async () => {
      const email = chance.email();
      const response = await request(server)
        .post(path)
        .send({ name: 'A', email, password: 'abc' })
        .expect(201);

      const user: UserDto = response.body;
      expect(user).toEqual(expect.objectContaining({ name: 'A', email }));
      expect(user.id).toBeDefined();
    });
    it('should throw error when the email already exists', async () => {
      const email = chance.email();
      await request(server)
        .post(path)
        .send({ name: 'A', email, password: 'abc' })
        .expect(201);
      await request(server)
        .post(path)
        .send({ name: 'A', email, password: 'abc' })
        .expect(400);
    });
    it('should throw error when the email is invalid', async () => {
      await request(server)
        .post(path)
        .send({ name: 'A', email: 'x', password: 'abc' })
        .expect(400);
    });
    it('should throw error when the name is invalid', async () => {
      await request(server)
        .post(path)
        .send({ name: '', email: 'a@test.abc', password: 'abc' })
        .expect(400);
    });
    it('should throw error when the password is invalid', async () => {
      await request(server)
        .post(path)
        .send({ name: 'A', email: 'a@test.abc', password: '' })
        .expect(400);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should login with valid credentials', async () => {
      throw new NotImplementedException();
    });
    it('should throw error with invalid credentials', async () => {
      throw new NotImplementedException();
    });
  });
});
