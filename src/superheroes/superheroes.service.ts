import { Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { Superhero } from './entities/superhero.entity';
import { v4 as uuidv4 } from 'uuid';
import { SuperheroesGateway } from './superheroes.gateway';

/**
 * Service handling business logic for superheroes
 */
@Injectable()
export class SuperheroesService {
  constructor(private readonly superheroesGateway: SuperheroesGateway) {}

  // In-memory storage for superheroes
  private readonly superheroes: Superhero[] = [];

  /**
   * Creates a new superhero
   * @param createSuperheroDto - The data for creating a new superhero
   * @returns The created superhero
   */
  create(createSuperheroDto: CreateSuperheroDto): Superhero {
    const superhero: Superhero = {
      id: uuidv4(),
      ...createSuperheroDto,
      createdAt: new Date(),
    };

    this.superheroes.push(superhero);
    this.superheroesGateway.notifySuperheroCreated(superhero);
    this.superheroesGateway.notifySuperheroesUpdated(this.findAll());
    return superhero;
  }

  /**
   * Retrieves all superheroes sorted by humility score in descending order
   * @returns Array of superheroes
   */
  findAll(): Superhero[] {
    return [...this.superheroes].sort(
      (a, b) => b.humilityScore - a.humilityScore,
    );
  }
}
