import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperheroesModule } from './superheroes/superheroes.module';

describe('AppModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(AppController)).toBeInstanceOf(AppController);
    expect(module.get(AppService)).toBeInstanceOf(AppService);
  });

  it('should include SuperheroesModule', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const superheroesModule = module.get(SuperheroesModule);
    expect(superheroesModule).toBeDefined();
  });
});
