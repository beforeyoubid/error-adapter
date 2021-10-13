import * as Sentry from '@sentry/node';
import { logger } from '@beforeyoubid/logger-adapter';
import { UserInputError } from 'apollo-server';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

import { ErrorCode } from './constants';

/* tslint:disable */
export class NotAuthorized extends Error {}
export class NotFound extends Error {}
export class NotAuthenticated extends Error {}
export class ConflictError extends Error {}
export class PaymentError extends Error {}
export class ValidationError extends Error {}
export { UserInputError };

const errorTypesForSentry = [ErrorCode.AUTHORIZATION_ERROR, ErrorCode.SERVER_ERROR];
const errorTypesToIncludeDetails = [ErrorCode.VALIDATION_ERROR];

const convertErrorToCode = (error: Error): ErrorCode => {
  const { constructor } = error || {};

  switch (constructor) {
    case NotAuthenticated:
      return ErrorCode.AUTHENTICATION_ERROR;
    case NotAuthorized:
      return ErrorCode.AUTHORIZATION_ERROR;
    case NotFound:
      return ErrorCode.NOT_FOUND_ERROR;
    case ValidationError:
      return ErrorCode.VALIDATION_ERROR;
    case UserInputError:
      return ErrorCode.BAD_USER_INPUT;
    case ConflictError:
      return ErrorCode.CONFLICT_ERROR;

    default:
      return ErrorCode.SERVER_ERROR;
  }
};

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

const handleUserAccessDirectiveError = (error: Error, id: any, extra: any) => {
  if (verifyIsSentryLevelError(error)) {
    Sentry.captureException(error, { extra });
  } else {
    logger.info(`Skipping Sentry capture for user ${id} access directive error: ${error.message}`);
  }
};

const verifyIsSentryLevelError = (error: Error): boolean => {
  const code = convertErrorToCode(error);

  const errorTypesForSentry: ErrorCode[] = [ErrorCode.SERVER_ERROR];

  return errorTypesForSentry.includes(code);
};

export { formatError, convertErrorToCode, handleUserAccessDirectiveError, verifyIsSentryLevelError };
