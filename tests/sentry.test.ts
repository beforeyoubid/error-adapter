import { GraphQLError } from 'graphql';
import { handleBeforeSend } from '../src/sentry';
import { ErrorEvent } from '@sentry/types/types/event';

describe('check for error code and has_sent_to_sentry', () => {
  it('if error has been already sent to sentry and is not the error type for sentry', () => {
    const originalException = {
      extensions: {
        serviceName: '',
        query: '',
        variables: '',
        exception: '',
        code: 'bad_user_input_error',
        has_sent_to_sentry: true,
      },
    } as unknown as GraphQLError;
    expect(handleBeforeSend(true as unknown as ErrorEvent, { originalException })).toBe(null);
  });
  it('if error has not been sent to sentry and is errortype for sentry', () => {
    const originalException = {
      extensions: {
        serviceName: '',
        query: '',
        variables: '',
        exception: '',
        code: 'server_error',
        has_sent_to_sentry: false,
      },
    } as unknown as GraphQLError;
    expect(handleBeforeSend(true as unknown as ErrorEvent, { originalException })).toBe(true);
  });
  it('if error has not been sent to sentry and is not an errortype for sentry', () => {
    const originalException = {
      extensions: {
        serviceName: '',
        query: '',
        variables: '',
        exception: '',
        code: 'bad_user_input_error',
        has_sent_to_sentry: false,
      },
    } as unknown as GraphQLError;
    expect(handleBeforeSend(true as unknown as ErrorEvent, { originalException })).toBe(null);
  });
});
