var Sentry = require('@sentry/node');
import { ISentryParams } from '../../types';
import { getSentryParams } from '../utils';

const sentryParams = getSentryParams();

/**
 * Initialise Sentry based on provided parameters
 * @param params
 */
const initialise = (params: ISentryParams = sentryParams): void => {
  const { sentryOptions, sendToSentry } = params;
  if (sendToSentry) {
    Sentry.init(sentryOptions);
    console.info(`Sentry is enabled`);
  } else {
    Sentry.init({ dsn: '', enabled: false });
    console.info(`Sentry is disabled`);
  }
};

// attach custom initialise function
Sentry.initialise = initialise;

export { Sentry };
