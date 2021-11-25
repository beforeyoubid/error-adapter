let Sentry = require('@sentry/node');
import { ISentryOptions } from '../../types';
import { getDefaultSentryParams } from '../utils';

let isSentryInitialised = false;

/**
 * Initialise Sentry based on provided options
 * @param options
 */
const initialise = (options?: ISentryOptions): void => {
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
Sentry.initialise = initialise;

export { Sentry };
