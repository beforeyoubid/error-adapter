import { NodeOptions } from '@sentry/node';
import { Handler } from 'aws-lambda';
import { Sentry } from '../node';

import { AWSLambda as SentryAWSLambda } from '@sentry/serverless';
import { WrapperOptions } from '@sentry/serverless/types/awslambda';

type CombinedWrapperOptions = {
  options?: NodeOptions;
} & WrapperOptions;

const isArgOptions = (arg: CombinedWrapperOptions | Handler<any, any>): arg is CombinedWrapperOptions =>
  typeof arg === 'object';
const isArgHandler = (arg: CombinedWrapperOptions | Handler<any, any>): arg is Handler<any, any> =>
  typeof arg === 'function';

/**
 * Wrap the serverless-sentry-lib function call to default to using own Sentry client unless custom options provided
 */
function withSentry(options: CombinedWrapperOptions, handler: Handler<any, any>): Handler<any, any>;
function withSentry(handler: Handler<any, any>): Handler<any, any>;
function withSentry(arg1: CombinedWrapperOptions | Handler<any, any>, arg2?: Handler<any, any>): Handler<any, any> {
  if (isArgOptions(arg1) && arg2 !== undefined && isArgHandler(arg2)) {
    // custom options passed in, include in callback
    // this allows the use of serverless-sentry-lib to handle custom options
    if (arg1.options) {
      SentryAWSLambda.init(arg1.options);
    }
    return SentryAWSLambda.wrapHandler(arg2, arg1);
  } else if (isArgHandler(arg1)) {
    // no custom options, intialise and pass in Sentry client, arg1 is the callback function
    Sentry.initialise();
    return SentryAWSLambda.wrapHandler(arg1);
  } else {
    throw TypeError('Invalid args passed to withSentry');
  }
}

export default withSentry;
