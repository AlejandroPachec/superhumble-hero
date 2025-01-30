import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { Superhero } from './entities/superhero.entity';

/**
 * Controller handling superhero-related endpoints
 */
@ApiTags('superheroes')
@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  /**
   * Create a new superhero
   */
  @Post()
  @ApiOperation({ summary: 'Create a new superhero' })
  @ApiResponse({
    status: 201,
    description: 'The superhero has been successfully created.',
    type: Superhero,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createSuperheroDto: CreateSuperheroDto): Superhero {
    return this.superheroesService.create(createSuperheroDto);
  }

  /**
   * Get all superheroes sorted by humility score
   */
  @Get()
  @ApiOperation({ summary: 'Get all superheroes sorted by humility score' })
  @ApiResponse({
    status: 200,
    description:
      'List of all superheroes sorted by humility score (descending).',
    type: [Superhero],
  })
  findAll(): Superhero[] {
    return this.superheroesService.findAll();
  }
}
