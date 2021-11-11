# BYB Error Adapter

This is an error handling module that supports multiple error types and the handling of each type accordingly using Sentry.

The following npm packages have been extended in this module:
- Sentry's [`@sentry/node`](https://docs.sentry.io/clients/node/) library, which does not support the filtration of local errors by default, and the use of an environment variable to disable Sentry alerts.
- The [`serverless-sentry-lib`](https://www.npmjs.com/package/serverless-sentry-lib) library, which does not support the use of an environment flag to disable Sentry alerts.

This module supports using environment variables to filter local error alerts, as well as disabling error alerts entirely. This is especially useful for microservice architectures where errors may be handled elsewhere.

## Supported Error types

| Error Type          | Alert Raised in Sentry |
| ------------------- | ---------------------- |
| `Server Error`      | Yes                    |
| `Not Authorized`    | Yes                    |
| `Not Authenticated` | No                     |
| `Not Found`         | No                     |
| `Validation Error`  | No                     |
| `Payment Error`     | No                     |
| `User Input Error`  | No                     |
| `Conflict Error`    | No                     |
| `External API Error`| No                     |
| `System Error`      | No                     |

This module is designed to work on a native node runtime and in a Lambda environment. For Lambda, please see the
[withSentry](#withSentry) section below.
# Setup
## Installation

```
  yarn add @beforeyoubid/error-adapter
```
## Environment Variables
Capturing can be controlled through the following environment variables. You can set them manually in your `serverless.yml` (Serverless Framework) or `template.yml` (AWS SAM) or let them be configured automatically using the [Serverless Sentry Plugin](https://github.com/arabold/serverless-sentry-plugin) during deployment.

| Environment Variable       | Description                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------- |
| `SENTRY_DSN`               | Sentry DSN Url                                                                     |
| `SENTRY_ENVIRONMENT`       | Environment (optional, e.g. "`dev`" or "`prod`")                                   |
| `SENTRY_RELEASE`           | Release number or version of your project (optional)                               |
| `SENTRY_AUTO_BREADCRUMBS`  | Automatically create breadcrumbs (see Sentry SDK docs, default to `true`)          |
| `SENTRY_FILTER_LOCAL`      | Don't report errors from local environments (defaults to `true`)                   |
| `SENTRY_CAPTURE_ERRORS`    | Enable capturing Lambda errors (defaults to `true`)                                |
| `SENTRY_CAPTURE_UNHANDLED` | Enable capturing unhandled Promise rejections (defaults to `true`)                 |
| `SENTRY_CAPTURE_UNCAUGHT`  | Enable capturing uncaught exceptions (defaults to `true`)                          |
| `SENTRY_CAPTURE_MEMORY`    | Enable monitoring memory usage (defaults to `true`)                                |
| `SENTRY_CAPTURE_TIMEOUTS`  | Enable monitoring execution timeouts (defaults to `true`)                          |
| `SENTRY_SOURCEMAPS`        | Enable [Webpack](https://webpack.js.org/) sourcemaps support (defaults to `false`) |
| `DISABLE_SENTRY`           | Disable Sentry, not set automatically (defaults to `false`)                        |


## Use Together With the Serverless Sentry Plugin
The [Serverless Sentry Plugin](https://github.com/arabold/serverless-sentry-plugin) allows simpler configuration of the library through the `serverless.yml` and will upload your source-maps automatically during deployment. This is the recommended way of using the `serverless-sentry-lib` library.

Instead of manually setting environment variables, the plugin determines and sets them automatically. In the `serverless.yml` simply load the plugin and set the `dsn` configuration option as follows:

```yaml
service: my-serverless-project
provider:
  # ...
plugins: serverless-sentry
custom:
  sentry:
    dsn: https://xxxx:yyyy@sentry.io/zzzz # URL provided by Sentry
    filterLocal: true # Optional
```

You can still manually set environment variables on a per-function level to overwrite the default ones. Please refer to the [Serverless Sentry Plugin](https://github.com/arabold/serverless-sentry-plugin) for full documentation of all available options.

# Usages
The module caters for the following usage mechanisms:
- Using `withSentry` higher-order function. 
  - This can be used in confuction with the `formatErrors` function (see below).
  - Used to wrap a Lambda handler to capture exceptions as per the `serverless-sentry-lib` library.
- Using `formatErrors` function to format and capture errors caught by GraphQL.
  - This can be passed into a GraphQL handler function to format and send errors to Sentry.
- Using `handleErrorSentryOptions` to apply the above rules to your own `Sentry` client.
- Adding custom `Sentry` options in conjunction with the options provided by this library.
### 1) Using withSentry higher-order function
**Original Lambda Handler Code**:

```ts
  export async function handler(event, context) {
    console.log("EVENT: \n" + JSON.stringify(event, null, 2));
    return context.logStreamName;
  }
```

**New Lambda Handler Code Using `withSentry` For Sentry Reporting**

```ts
  import { withSentry } from "@beforeyoubid/error-adapter"; // This helper library

  export const handler = withSentry(async (event, context) => {
    console.log("EVENT: \n" + JSON.stringify(event, null, 2));
    return context.logStreamName;
  });
```
Custom configuration options may also be used. Please refer to the [Serverless Sentry Plugin](https://github.com/arabold/serverless-sentry-plugin) for full documentation of all available options.

### 2) Using `formatErrors` function to handle errors caught by GraphQL
```ts
import { ApolloServer } from 'apollo-server-lambda';
import schema from '../graphql';
import { formatError, withSentry } from '@beforeyoubid/error-adapter';

const server = new ApolloServer({
  schema,
  formatError,
  context: async ({ event, context }): Promise<ApplicationContext> => {
    const headers = {};
    let gqcontext = {};
    if (event.headers) {
      const sourceUserAgent =
        _.get(event, 'headers.x-source-user-agent') || _.get(event, 'headers.X-Source-User-Agent');

      gqcontext = {
        sourceUserAgent,
      };
    }
    return {
      // cache,
      functionName: context.functionName,
      headers,
      ...gqcontext,
    };
  },
});

const graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    methods: ['POST'],
  },
});

export default withSentry(graphqlHandler);
```
### 3) Using `handleErrorSentryOptions` to apply the above rules to your own `Sentry` client.
### With GraphQL
Using `handleErrorSentryOptions` function to send errors to Sentry by passing `handleErrorSentryOptions` function into
Lambda GraphQL handler.

```ts
import { ApolloServer } from 'apollo-server-lambda';
import withSentry from 'serverless-sentry-lib';
import schema from '../graphql';
import { formatError, handleErrorSentryOptions } from '@beforeyoubid/error-adapter';

const server = new ApolloServer({
  schema,
  formatError,
  context: async ({ event, context }): Promise<ApplicationContext> => {
    const headers = {};
    let gqcontext = {};
    if (event.headers) {
      const sourceUserAgent =
        _.get(event, 'headers.x-source-user-agent') || _.get(event, 'headers.X-Source-User-Agent');

      gqcontext = {
        sourceUserAgent,
      };
    }
    return {
      // cache,
      functionName: context.functionName,
      headers,
      ...gqcontext,
    };
  },
});

const graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    methods: ['POST'],
  },
});

export default withSentry(handleErrorSentryOptions, graphqlHandler);
```

### Using without GraphQL
```ts
import withSentry from 'serverless-sentry-lib';
import { handleErrorSentryOptions NotFound } from '@beforeyoubid/error-adapter';

export const cronHandler = withSentry(handleErrorSentryOptions, async (event, context) => {
  console.log('EVENT: \n' + JSON.stringify(event, null, 2));
  throw new Error('This error will be raised in Sentry');
  return context.logStreamName;
});
```

### 3) Adding custom `Sentry` options in conjunction with the options provided by this library.
This is particularly useful when the Sentry client must be initialized as early as possbile. eg. when using Sentry with [`express`](https://docs.sentry.io/platforms/node/guides/express/). The library will apply the options highlighted above with the options passed into the `Sentry.initialise()` function.  
```ts
import express from 'express';
import { Sentry, withSentry } from '@beforeyoubid/error-adapter';
import * as Tracing from '@sentry/tracing';

const app = express();
Sentry.initialise({
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // amount of performance reports (out of 1) are sent to sentry
  tracesSampleRate: 0.5,
});

app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);

export const cronHandler = withSentry(async (event, context) => {
  console.log('EVENT: \n' + JSON.stringify(event, null, 2));
  throw new Error('This error will be raised in Sentry');
  return context.logStreamName;
});
```
# Roadmap
- Extend this module to support centralised copy on error messages (useful for business users seeing the error, as well
  as developers investigating the error).
