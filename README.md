# SuperHumble Heroes API

A NestJS-based REST API for managing humble superheroes. This API allows you to create and list superheroes, with a focus on their humility scores.

## Features

- Create new superheroes with name, superpower, and humility score
- List all superheroes sorted by their humility score
- Full API documentation with Swagger
- Input validation
- Comprehensive test coverage
- Includes a showcase test demonstrating test failure scenarios.

## Technologies Used

- NestJS with Fastify
- TypeScript
- Jest for testing
- Swagger for API documentation
- Class Validator for input validation

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm (v9 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd humble-superhero-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3100`.
API documentation is available at `http://localhost:3100/api`.

## API Endpoints

### POST /superheroes

Creates a new superhero.

Request body:

```json
{
  "name": "The Humble Helper",
  "superpower": "Making everyone feel valued and appreciated",
  "humilityScore": 9
}
```

### GET /superheroes

Returns a list of all superheroes, sorted by humility score in descending order.

## Testing

The project includes comprehensive test coverage with both unit and e2e tests. One test has been deliberately designed to fail as a showcase of test behavior and error reporting (Find the hidden message).

Our test suite includes:

- Unit tests for all services and controllers
- Module integration tests ensuring proper dependency injection
- Bootstrap configuration tests
- End-to-end API tests
- Input validation tests
- Data sorting tests

Run unit tests:

```bash
npm run test
```

Run e2e tests:

```bash
npm run test:e2e
```

Run test coverage:

```bash
npm run test:cov
```

### Test Coverage Goals

- Maintain >80% overall code coverage
- 100% coverage for business logic in services
- 100% coverage for DTOs and entities
- 100% coverage for controllers
- Full coverage of module configurations

## Team Collaboration Notes

To improve or expand this project, here are some areas I would propose to collaborate on:

1. Data Persistence

   - Implement a database solution (e.g., PostgreSQL with TypeORM)
   - Add data migration strategies

2. Authentication & Authorization

   - Add user authentication
   - Implement role-based access control so only the worthy can create superheroes nad/or delete them.

3. Additional Features

   - Add superhero teams/groups. They are all humble, but some are more humble than others...
   - Implement superhero achievements tracking.
   - Autogenerate superhero images using Generative AI based on the superhero's name and superpower.

4. Performance Improvements
   - Add caching layer (Redis)
   - Implement pagination for large datasets
   - Consider changing the testing framework to a faster one like Vitest.

## If I Had More Time...

Given more time, I would:

1. Implement a React frontend with real-time updates using WebSockets
2. Add a caching layer using Redis
3. Implement a proper database with TypeORM
4. Add more advanced filtering and search capabilities
5. Implement user authentication and authorization
6. Add a CI/CD pipeline with automated deployments
7. Implement rate limiting and request throttling
8. Add performance monitoring and metrics
9. Create a Docker setup for easier deployment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
