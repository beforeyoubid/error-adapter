var Sentry = require('@sentry/node');
import { ISentryParams } from '../../types';
import { getSentryParams } from '../utils';

const sentryParams = getSentryParams();
var initialised = false;

/**
 * Initialise Sentry based on provided parameters
 * @param params
 */
const initialise = (params: ISentryParams = sentryParams): void => {
  if (!initialised) {
    const { sentryOptions, sendToSentry } = params;
    if (sendToSentry) {
      Sentry.init(sentryOptions);
    } else {
      Sentry.init({ dsn: '', enabled: false });
    }
  }
  initialised = true;
};

// attach custom initialise function
Sentry.initialise = initialise;

export { Sentry };
