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
    case ActivityLogError:
      return ErrorCode.ACTIVITY_LOG_ERROR;
    case PermanentActivityLogError:
      return ErrorCode.PERMANENT_ACTIVITY_LOG_ERROR;
    case APIFailureActivityLogError:
      return ErrorCode.API_FAILURE_ACTIVITY_LOG_ERROR;
    case MissingFieldActivityLogError:
      return ErrorCode.MISSING_FIELD_ACTIVITY_LOG_ERROR;
    case ExternalAPIAuthenticationFailActivityLogError:
      return ErrorCode.EXTERNAL_API_AUTHENTICATION_FAIL_ACTIVITY_LOG_ERROR;
    case MissingExternalResourceActivityLogError:
      return ErrorCode.MISSING_EXTERNAL_RESOURCE_ACTIVITY_LOG_ERROR;
    case InternalAPIFailureActivityLogError:
      return ErrorCode.INTERNAL_API_FAILURE_ACTIVITY_LOG_ERROR;
    case EmailActivityLogError:
      return ErrorCode.EMAIL_ACTIVITY_LOG_ERROR;
    case SMSActivityLogError:
      return ErrorCode.SMS_ACTIVITY_LOG_ERROR;
    case DBActivityLogError:
      return ErrorCode.DB_ACTIVITY_LOG_ERROR;
    case RedisActivityLogError:
      return ErrorCode.REDIS_ACTIVITY_LOG_ERROR;
    case InvestorOptOutActivityError:
      return ErrorCode.INVESTOR_OPT_OUT_ACTIVITY_LOG_ERROR;
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
    case ErrorCode.ACTIVITY_LOG_ERROR:
      return ActivityLogError;
    case ErrorCode.PERMANENT_ACTIVITY_LOG_ERROR:
      return PermanentActivityLogError;
    case ErrorCode.API_FAILURE_ACTIVITY_LOG_ERROR:
      return APIFailureActivityLogError;
    case ErrorCode.MISSING_FIELD_ACTIVITY_LOG_ERROR:
      return MissingFieldActivityLogError;
    case ErrorCode.EXTERNAL_API_AUTHENTICATION_FAIL_ACTIVITY_LOG_ERROR:
      return ExternalAPIAuthenticationFailActivityLogError;
    case ErrorCode.MISSING_EXTERNAL_RESOURCE_ACTIVITY_LOG_ERROR:
      return MissingExternalResourceActivityLogError;
    case ErrorCode.INTERNAL_API_FAILURE_ACTIVITY_LOG_ERROR:
      return InternalAPIFailureActivityLogError;
    case ErrorCode.EMAIL_ACTIVITY_LOG_ERROR:
      return EmailActivityLogError;
    case ErrorCode.SMS_ACTIVITY_LOG_ERROR:
      return SMSActivityLogError;
    case ErrorCode.DB_ACTIVITY_LOG_ERROR:
      return DBActivityLogError;
    case ErrorCode.REDIS_ACTIVITY_LOG_ERROR:
      return RedisActivityLogError;
    case ErrorCode.INVESTOR_OPT_OUT_ACTIVITY_LOG_ERROR:
      return InvestorOptOutActivityError;
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
};

export { convertErrorToCode, getErrorType, isSentryLevelError };
