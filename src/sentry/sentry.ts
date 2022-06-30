import { convertErrorToCode } from '../utils';
import { errorTypesForSentry, ErrorCode } from '../constants';
import { GraphQLError } from 'graphql';

/**
 * Determine which errors are sent to Sentry based on error type
 */
const handleBeforeSend = (_event: any, hint: { originalException: Error | GraphQLError }) => {
  const { originalException: error } = hint;

  let code = convertErrorToCode(error);

  // if code not found, attempt to find the code from error.extensions.code
  // default to server error if not found
  if (!code) {
    code = ((error as GraphQLError).extensions?.code as ErrorCode) ?? ErrorCode.SERVER_ERROR;
    // running in gateway
  }

  if (!errorTypesForSentry.includes(code) || (error as GraphQLError).extensions?.has_sent_to_sentry) {
    return null;
  }
  return _event;
};

export { handleBeforeSend };
