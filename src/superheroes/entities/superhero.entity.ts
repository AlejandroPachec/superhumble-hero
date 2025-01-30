import { ApiProperty } from '@nestjs/swagger';

/**
 * Represents a Superhero entity in the system
 */
export class Superhero {
  @ApiProperty({
    description: 'The unique identifier of the superhero',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the superhero',
    example: 'The Humble Helper',
  })
  name: string;

  @ApiProperty({
    description: 'The superpower of the superhero',
    example: 'Making everyone feel valued and appreciated',
  })
  superpower: string;

  @ApiProperty({
    description: 'A rating from 1 to 10 indicating how humble the superhero is',
    example: 8,
  })
  humilityScore: number;

  @ApiProperty({
    description: 'The date and time when the superhero was created',
    example: '2024-01-30T22:30:00.000Z',
  })
  createdAt: Date;
}
