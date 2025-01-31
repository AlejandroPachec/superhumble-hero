import { Module } from '@nestjs/common';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';
import { SuperheroesGateway } from './superheroes.gateway';

@Module({
  controllers: [SuperheroesController],
  providers: [SuperheroesService, SuperheroesGateway],
})
export class SuperheroesModule {}
