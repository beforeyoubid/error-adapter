import { convertErrorToCode } from '../utils';
import { errorTypesForSentry } from '../constants';

/**
 * Determine which errors are sent to Sentry based on error type
 */
const handleBeforeSend = (_event: any, hint: { originalException: Error }) => {
  const { originalException: error } = hint;
  const code = convertErrorToCode(error);
  console.log('error code: ' + code);

  if (!errorTypesForSentry.includes(code)) {
    console.log('ignoring error');
    return null;
  }
  console.log('sending error to Sentry');
  return error;
};

export { handleBeforeSend };
