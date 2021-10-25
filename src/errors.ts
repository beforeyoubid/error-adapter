import { Sentry } from './sentry';
import { UserInputError } from 'apollo-server';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { errorTypesToIncludeDetails } from './constants';
import { convertErrorToCode } from './utils';

// Initialise the Sentry client
Sentry.initialise();

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
  
  let details;
  const code = convertErrorToCode(err);

  // Sentry client will determine if the error is to be reported to Sentry
  Sentry.captureException(err);

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
