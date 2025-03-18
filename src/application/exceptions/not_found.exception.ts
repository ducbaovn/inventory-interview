import { GraphQLError } from 'graphql';

export class EntityNotFoundException extends GraphQLError {
  constructor(message?: string) {
    super('ENTITY_NOT_FOUND', {
      extensions: {
        code: 'ENTITY_NOT_FOUND',
        message,
      },
    });
  }
}
