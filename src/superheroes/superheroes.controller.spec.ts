import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { Superhero } from './entities/superhero.entity';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;
  let service: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [SuperheroesService],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new superhero', () => {
      const createSuperheroDto: CreateSuperheroDto = {
        name: 'Test Hero',
        superpower: 'Testing everything thoroughly',
        humilityScore: 8,
      };

      const expectedResult: Superhero = {
        id: 'test-id',
        ...createSuperheroDto,
        createdAt: new Date(),
      };

      jest.spyOn(service, 'create').mockReturnValue(expectedResult);

      const result = controller.create(createSuperheroDto);

      expect(result).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createSuperheroDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of superheroes sorted by humility score', () => {
      const expectedResult: Superhero[] = [
        {
          id: '1',
          name: 'Hero 1',
          superpower: 'Power 1',
          humilityScore: 9,
          createdAt: new Date(),
        },
        {
          id: '2',
          name: 'Hero 2',
          superpower: 'Power 2',
          humilityScore: 7,
          createdAt: new Date(),
        },
      ];

      jest.spyOn(service, 'findAll').mockReturnValue(expectedResult);

      const result = controller.findAll();

      expect(result).toBe(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
