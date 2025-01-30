import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroesService],
    }).compile();

    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new superhero with valid data', () => {
      const createSuperheroDto: CreateSuperheroDto = {
        name: 'Test Hero',
        superpower: 'Testing everything thoroughly',
        humilityScore: 8,
      };

      const result = service.create(createSuperheroDto);

      expect(result).toEqual({
        id: expect.any(String),
        name: createSuperheroDto.name,
        superpower: createSuperheroDto.superpower,
        humilityScore: createSuperheroDto.humilityScore,
        createdAt: expect.any(Date),
      });
    });
  });

  describe('findAll', () => {
    it('should return an empty array when no superheroes exist', () => {
      const result = service.findAll();
      expect(result).toEqual([]);
    });

    it('should return superheroes sorted by humility score in descending order', () => {
      // Create test data
      const heroes = [
        {
          name: 'Hero 1',
          superpower: 'Power 1',
          humilityScore: 5,
        },
        {
          name: 'Hero 2',
          superpower: 'Power 2',
          humilityScore: 9,
        },
        {
          name: 'Hero 3',
          superpower: 'Power 3',
          humilityScore: 7,
        },
      ];

      // Add heroes to service
      heroes.forEach((hero) => service.create(hero));

      // Get sorted heroes
      const result = service.findAll();

      // Verify order
      expect(result).toHaveLength(3);
      expect(result[0].humilityScore).toBe(9);
      expect(result[1].humilityScore).toBe(7);
      expect(result[2].humilityScore).toBe(5);
    });
  });
});
