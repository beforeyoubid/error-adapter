import {
  NotAuthorized,
  NotFound,
  NotAuthenticated,
  ConflictError,
  PaymentError,
  ValidationError,
  UserInputError,
} from './errors';
import { ErrorCode, errorTypesForSentry } from './constants';

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

    default:
      return ErrorCode.SERVER_ERROR;
  }
};

/**
 * Determine which errors are sent to Sentry based on error type
 */
const handleBeforeSend = (_event: any, hint: { originalException: Error }) => {
  const { originalException: error } = hint;
  const code = convertErrorToCode(error);
  console.log('error code: ' + code);

  if (!errorTypesForSentry.includes(code)) {
    console.log('not sending to Sentry');
    return null;
  }
  console.log('sending to Sentry');
  return _event;
};

export { convertErrorToCode, handleBeforeSend };
