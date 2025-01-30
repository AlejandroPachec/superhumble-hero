import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max, Length } from 'class-validator';

/**
 * Data Transfer Object for creating a new superhero
 */
export class CreateSuperheroDto {
  @ApiProperty({
    description: 'The name of the superhero',
    example: 'The Humble Helper',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    description: 'The superpower of the superhero',
    example: 'Making everyone feel valued and appreciated',
    minLength: 5,
    maxLength: 100,
  })
  @IsString()
  @Length(5, 100)
  superpower: string;

  @ApiProperty({
    description: 'A rating from 1 to 10 indicating how humble the superhero is',
    example: 8,
    minimum: 1,
    maximum: 10,
  })
  @IsInt()
  @Min(1)
  @Max(10)
  humilityScore: number;
}
