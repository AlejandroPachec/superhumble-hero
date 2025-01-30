import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { bootstrap } from './main';

describe('Bootstrap', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
  });

  afterEach(async () => {
    await app.close();
  });

  it('should bootstrap the application', async () => {
    const app = await bootstrap();
    expect(app).toBeDefined();
    await app.close();
  });

  it('should initialize with proper configuration', async () => {
    // Add validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // Enable CORS
    app.enableCors();

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    // Test validation pipe by making a request
    const response = await app.inject({
      method: 'POST',
      url: '/superheroes',
      payload: {
        invalidField: 'should be stripped',
        name: 'Test Hero',
        superpower: 'Testing',
        humilityScore: 8,
      },
    });
    const body = JSON.parse(response.payload);
    expect(body).not.toHaveProperty('invalidField');
  });
});
