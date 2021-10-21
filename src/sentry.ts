import { convertErrorToCode } from './utils';
import { errorTypesForSentry } from './constants';

/**
 * Determine which errors are sent to Sentry based on error type
 */
const handleErrorSentryOptions = {
  sentryOptions: {
    beforeSend(_event: any, hint: { originalException: Error }) {
      const { originalException: error } = hint;
      const code = convertErrorToCode(error);

      if (!errorTypesForSentry.includes(code)) {
        return null;
      }
      return _event;
    },
  },
};

export { handleErrorSentryOptions };