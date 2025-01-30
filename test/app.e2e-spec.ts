import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.statusCode).toBe(200);
    expect(response.payload).toBe('Hello World! (This fails on purpose)');
    expect(response.payload).toBe(
      'Hello Ejam! Hire me! You will not regret it!',
    );
  });

  it('/superheroes (POST) - should create a new superhero', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/superheroes',
      payload: {
        name: 'Test Hero',
        superpower: 'Testing everything thoroughly',
        humilityScore: 8,
      },
    });

    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.payload);
    expect(body).toEqual({
      id: expect.any(String),
      name: 'Test Hero',
      superpower: 'Testing everything thoroughly',
      humilityScore: 8,
      createdAt: expect.any(String),
    });
  });

  it('/superheroes (POST) - should validate input', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/superheroes',
      payload: {
        name: 'A', // Too short
        superpower: 'Test', // Too short
        humilityScore: 11, // Above maximum
      },
    });

    expect(response.statusCode).toBe(400);
  });

  it('/superheroes (GET) - should return sorted superheroes', async () => {
    // Create test data
    const heroes = [
      {
        name: 'Hero 1',
        superpower: 'Testing Power 1',
        humilityScore: 5,
      },
      {
        name: 'Hero 2',
        superpower: 'Testing Power 2',
        humilityScore: 9,
      },
    ];

    // Add heroes
    for (const hero of heroes) {
      await app.inject({
        method: 'POST',
        url: '/superheroes',
        payload: hero,
      });
    }

    // Get sorted list
    const response = await app.inject({
      method: 'GET',
      url: '/superheroes',
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.payload);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThanOrEqual(2);

    // Verify sorting
    const humilityScores = body.map((hero) => hero.humilityScore);
    const sortedScores = [...humilityScores].sort((a, b) => b - a);
    expect(humilityScores).toEqual(sortedScores);
  });
});
