import { Sentry } from './sentry';
import { UserInputError } from 'apollo-server-errors';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { errorTypesToIncludeDetails } from './constants';
import { convertErrorToCode, getErrorType } from './utils';
import {
  ActivityLogError,
  PermanentActivityLogError,
  APIFailureActivityLogError,
  MissingFieldActivityLogError,
  ExternalAPIAuthenticationFailActivityLogError,
  MissingExternalResourceActivityLogError,
  InternalAPIFailureActivityLogError,
  EmailActivityLogError,
  SMSActivityLogError,
  DBActivityLogError,
  RedisActivityLogError,
  InvestorOptOutActivityError,
} from './activity-log-errors';
/* tslint:disable */
export class NotAuthorized extends Error {}
export class NotFound extends Error {}
export class NotAuthenticated extends Error {}
export class ConflictError extends Error {}
export class PaymentError extends Error {}
export class ValidationError extends Error {}
export class ExternalApiError extends Error {}
export class SystemError extends Error {}

/**
 * Used to correctly format GraphQL errors to prepare for sending to Sentry if required
 */
const formatError = (error: GraphQLError): GraphQLFormattedError => {
  const err: Error | GraphQLError = error.originalError ?? error;

  let details;
  const code = convertErrorToCode(err);

  // Error will be a GraphQL error if formatting error using a GraphQL Federation
  if (err instanceof Error && !(err instanceof GraphQLError)) {
    Sentry.captureException(err);
  } else {
    const typeOfError = getErrorType(err);
    const er = new typeOfError((err as { message?: string })?.message ?? '');
    const stack: string[] = err.extensions?.exception?.stacktrace ?? [];
    er.stack = stack.join('\n');

    Sentry.captureException(er, {
      extra: {
        ...(err.extensions ?? {}),
        ...(error.extensions ?? {}),
      },
    });
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

export {
  formatError,
  UserInputError,
  ActivityLogError,
  PermanentActivityLogError,
  APIFailureActivityLogError,
  MissingFieldActivityLogError,
  ExternalAPIAuthenticationFailActivityLogError,
  MissingExternalResourceActivityLogError,
  InternalAPIFailureActivityLogError,
  EmailActivityLogError,
  SMSActivityLogError,
  DBActivityLogError,
  RedisActivityLogError,
  InvestorOptOutActivityError,
};
