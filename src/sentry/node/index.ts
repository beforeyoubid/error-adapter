import Sentry from '@sentry/node';
import { NodeOptions } from '@sentry/node';
import { getDefaultSentryParams } from '../utils';

let isSentryInitialised = false;

/**
 * Initialise Sentry based on provided options
 * @param options
 */
const initialise = (options?: NodeOptions): void => {
  if (!isSentryInitialised) {
    const { defaultSentryOptions, sendToSentry } = getDefaultSentryParams();

    // replace defaulted options with options passed in if they exist
    let sentryOptions = { ...defaultSentryOptions, ...options };

    if (sendToSentry) {
      Sentry.init(sentryOptions);
    } else {
      Sentry.init({ dsn: '', enabled: false });
    }
  }
  isSentryInitialised = true;
};

// attach custom initialise function
const SentryWithInitialise: typeof Sentry & { initialise: typeof initialise } = Object.assign(Sentry, { initialise });

export { SentryWithInitialise as Sentry };
