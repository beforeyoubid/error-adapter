let serverlessSentry = require('serverless-sentry-lib');
import { Sentry } from '../node';

// Initialise the Sentry client based on environment variables
Sentry.initialise();

/**
 * Wrap the serverless-sentry-lib function call to default to using own Sentry client unless custom options provided
 */
const withSentry = (arg1: object, arg2?: any) => {
  if (typeof arg1 === 'object') {
    // custom options passed in, include in callback
    // this allows the use of serverless-sentry-lib to handle custom options
    return serverlessSentry(arg1, arg2);
  } else if (typeof arg1 === 'function') {
    // no custom options, pass in pre-initialised Sentry client, arg1 is the callback function
    return serverlessSentry({ sentry: Sentry }, arg1);
  } else {
    throw TypeError('Invalid args passed to withSentry');
  }
};

export default withSentry;
