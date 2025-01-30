import { Test } from '@nestjs/testing';
import { SuperheroesModule } from './superheroes.module';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';

describe('SuperheroesModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [SuperheroesModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(SuperheroesController)).toBeInstanceOf(
      SuperheroesController,
    );
    expect(module.get(SuperheroesService)).toBeInstanceOf(SuperheroesService);
  });

  it('should provide SuperheroesService', async () => {
    const module = await Test.createTestingModule({
      imports: [SuperheroesModule],
    }).compile();

    const service = module.get(SuperheroesService);
    expect(service.create).toBeDefined();
    expect(service.findAll).toBeDefined();
  });
});
