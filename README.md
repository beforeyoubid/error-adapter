# BYB Error Adapter

This is an error handling module that supports multiple error types and the handling of each type accordingly using
Sentry.

This module does not set up a Sentry client, therefore a client must already be set up and initialized.

This module provides functions to handle the formatting of GraphQL errors and sending errors to Sentry based on the error type.

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

# Setup

## Installation

```
  yarn add @beforeyoubid/error-adapter
```
# Usages
## `formatError`

Using `formatError` function to format errors in preparation for Sentry by passing `formatError` function into GraphQL
handler.

```ts
import { ApolloServer } from 'apollo-server-lambda';
import withSentry from 'serverless-sentry-lib';
import schema from '../graphql';
import { formatError } from '@beforeyoubid/error-adapter';

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

## `handleErrorSentryOptions`

### Using with GraphQL
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
import { handleErrorSentryOptions, NotFound } from '@beforeyoubid/error-adapter';

export const cronHandler = withSentry(handleErrorSentryOptions, async (event, context) => {
  console.log('EVENT: \n' + JSON.stringify(event, null, 2));
  throw new Error('This error will be raised in Sentry');
  throw new NotFound('This error will NOT be raised in Sentry');
  return context.logStreamName;
});
```

# Roadmap

- Extend this module to support centralised copy on error messages (useful for business users seeing the error, as well
  as developers investigating the error).
