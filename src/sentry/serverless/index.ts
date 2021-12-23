import serverlessSentry, { WithSentryOptions, Handler } from 'serverless-sentry-lib';
import { Sentry } from '../node';

const isArgOptions = (arg: WithSentryOptions | Handler<any, any>): arg is WithSentryOptions => typeof arg === 'object';
const isArgHandler = (arg: WithSentryOptions | Handler<any, any>): arg is Handler<any, any> =>
  typeof arg === 'function';

/**
 * Wrap the serverless-sentry-lib function call to default to using own Sentry client unless custom options provided
 */
function withSentry(options: WithSentryOptions, handler: Handler<any, any>): Handler<any, any>;
function withSentry(handler: Handler<any, any>): Handler<any, any>;
function withSentry(arg1: WithSentryOptions | Handler<any, any>, arg2?: Handler<any, any>): Handler<any, any> {
  if (isArgOptions(arg1) && arg2 !== undefined && isArgHandler(arg2)) {
    // custom options passed in, include in callback
    // this allows the use of serverless-sentry-lib to handle custom options
    return serverlessSentry(arg1, arg2);
  } else if (isArgHandler(arg1)) {
    // no custom options, intialise and pass in Sentry client, arg1 is the callback function
    Sentry.initialise();
    return serverlessSentry({ sentry: Sentry }, arg1);
  } else {
    throw TypeError('Invalid args passed to withSentry');
  }
}

export default withSentry;
