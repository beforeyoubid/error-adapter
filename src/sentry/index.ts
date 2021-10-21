import { handleBeforeSend } from './sentry';

/**
 * Wrap handleBeforeSend function for Sentry
 */
const handleErrorSentryOptions = {
  sentryOptions: {
    beforeSend: handleBeforeSend
  },
};

export { handleErrorSentryOptions };
