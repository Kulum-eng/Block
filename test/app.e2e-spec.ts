import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Notificaciones (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
      
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/gear/notificacion (POST) - debería crear una notificacion', () => {
    return request(app.getHttpServer())
      .post('/gear/notificacion')
      .send({ userId: 1, mensaje: 'Nuevo contrato disponible' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.message).toBe('Nuevo contrato ya disponible ');
      });
  });

  it('/gear/notificaciones/:userId (GET) - deberia de obtener notificaciones ', () => {
    return request(app.getHttpServer())
      .get('/gear/notificaciones/1')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0]).toHaveProperty('message');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
