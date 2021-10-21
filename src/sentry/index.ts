import { handleBeforeSend } from './sentry';
import { Sentry } from './node';
import withSentry from './serverless';

/**
 * Wrap handleBeforeSend function for Sentry
 */
const handleErrorSentryOptions = {
  sentryOptions: {
    beforeSend: handleBeforeSend,
  },
};

export { handleErrorSentryOptions, Sentry, withSentry };
