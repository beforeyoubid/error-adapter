import { handleBeforeSend } from './utils';

/**
 * Options to be passed into Sentry client. Used to determine which errors are sent to Sentry based on error type
 */
const handleErrorSentryOptions = {
  sentryOptions: {
    beforeSend: handleBeforeSend,
  },
};

export { handleErrorSentryOptions };
