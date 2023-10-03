import { GraphQLError } from 'graphql';
import * as Sentry from '@sentry/node';

import { convertErrorToCode } from '../utils';
import { errorTypesForSentry, ErrorCode } from '../constants';

type ErrorEvent = Parameters<NonNullable<Sentry.NodeOptions['beforeSend']>>[0];
type EventHint = Parameters<NonNullable<Sentry.NodeOptions['beforeSend']>>[1];
type BeforeSendReturnType = ReturnType<NonNullable<Sentry.NodeOptions['beforeSend']>>;

/**
 * Determine which errors are sent to Sentry based on error type
 */
export const handleBeforeSend = (_event: ErrorEvent, hint: EventHint): BeforeSendReturnType => {
  const { originalException: error } = hint;

  let code = convertErrorToCode(error as Error);

  // if code not found, attempt to find the code from error.extensions.code
  // default to server error if not found
  if (!code) {
    code = ((error as GraphQLError).extensions?.code as ErrorCode) ?? ErrorCode.SERVER_ERROR;
  }

  if (!errorTypesForSentry.includes(code) || (error as GraphQLError).extensions?.has_sent_to_sentry) {
    return null;
  }
  return _event;
};
