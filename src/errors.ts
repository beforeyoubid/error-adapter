import * as Sentry from '@sentry/node';
import { UserInputError } from 'apollo-server';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { logger } from '@beforeyoubid/logger-adapter';
import { errorTypesToIncludeDetails, errorTypesForSentry } from './constants';
import { convertErrorToCode } from './utils';

/* tslint:disable */
export class NotAuthorized extends Error {}
export class NotFound extends Error {}
export class NotAuthenticated extends Error {}
export class ConflictError extends Error {}
export class PaymentError extends Error {}
export class ValidationError extends Error {}
export { UserInputError };

/**
 * Used to correctly format GraphQL errors to prepare for sending to Sentry if needed
 */
const formatError = (error: GraphQLError): GraphQLFormattedError => {
  const err = error.originalError ? error.originalError : error;
  logger.error(err);
  console.error(err);
  logger.info(err.stack);

  let details;
  const code = convertErrorToCode(err);

  if (errorTypesForSentry.includes(code)) {
    Sentry.captureException(err);
  }

  if (errorTypesToIncludeDetails.includes(code)) {
    details = error.message;
  }

  // @see http://facebook.github.io/graphql/June2018/#example-fce18
  return {
    ...error,
    extensions: {
      ...error.extensions,
      code,
      details,
    },
  };
};

export { formatError };
