# Inventory Service

## Setup local development

- postgres:12-alpine

```
docker-compose -f ./docker-compose.yml up
```

Note:

- you need to create .env file suitable with your local env
- required version node 20

## Migration data

### Define Entity

- TypeORM [https://typeorm.io/#/entities]

### Generate Migration File

```
npm run migrate:generate --name=[filename]
```

TypeORM Migration will compare between entities and database and then create migration file for different schema versions.

### Run migration

Auto run migration when starting app

## Running the Application

### Build And Start

```
npm run build
npm run start:prod
```

### For development

```
npm run start        // start ts
npm run start:dev    // start and watch
npm run start:debug  // start attach debug with port 9229
```

## Testing

- Using jest with coverage
- Collect coverage from service

```
npm run test
```

## Code Base Architecture

- Follow NestJS architecture [https://docs.nestjs.com/]

## To verify GraphQL

[https://studio.apollographql.com/sandbox/explorer]
