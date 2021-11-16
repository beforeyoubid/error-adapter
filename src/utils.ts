import {
  NotAuthorized,
  NotFound,
  NotAuthenticated,
  ConflictError,
  PaymentError,
  ValidationError,
  UserInputError,
  ExternalApiError,
  SystemError,
} from './errors';
import { ErrorCode, errorTypesForSentry } from './constants';
import { GraphQLError } from 'graphql';

/**
 * Parse the error based on the error constructor
 */
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
    case PaymentError:
      return ErrorCode.PAYMENT_ERROR;
    case ExternalApiError:
      return ErrorCode.EXTERNAL_API_ERROR;
    case SystemError:
      return ErrorCode.SYSTEM_ERROR;

    default:
      return ErrorCode.SERVER_ERROR;
  }
};

/**
 * Return error type based on error code
 */
 const getErrorType = (error: GraphQLError) => {
  const { code } = error.extensions ?? {};
  switch (code as ErrorCode) {
    case ErrorCode.AUTHENTICATION_ERROR:
      return NotAuthenticated;
    case ErrorCode.AUTHORIZATION_ERROR:
      return NotAuthorized;
    case ErrorCode.NOT_FOUND_ERROR:
      return NotFound;
    case ErrorCode.VALIDATION_ERROR:
      return ValidationError;
    case ErrorCode.BAD_USER_INPUT:
      return UserInputError;
    case ErrorCode.CONFLICT_ERROR:
      return ConflictError;
    case ErrorCode.PAYMENT_ERROR:
      return PaymentError;
    case ErrorCode.EXTERNAL_API_ERROR:
      return ExternalApiError;
    case ErrorCode.SYSTEM_ERROR:
      return SystemError;

    default:
      return Error;
  }
};

/**
 * Helper function to determine if an error is a Sentry level error
 */
const isSentryLevelError = (error: Error): boolean => {
  const code = convertErrorToCode(error);
  return errorTypesForSentry.includes(code);
}

export { convertErrorToCode, getErrorType, isSentryLevelError };
