import { ISentryParams } from './types';
import { isSentryEnabled } from './utils';

const getEnvs = (env = process?.env || {}) => {
  const {
    SENTRY_DSN = '',
    SENTRY_ENVIRONMENT = 'n/a',
    SENTRY_FILTER_LOCAL = 'true',
    SENTRY_SAMPLE_RATE = '1.0',
    DISABLE_SENTRY = 'false',
    STAGE = 'n/a',
  } = env;

  return {
    SENTRY_DSN,
    SENTRY_ENVIRONMENT,
    SENTRY_FILTER_LOCAL,
    SENTRY_SAMPLE_RATE,
    DISABLE_SENTRY,
    STAGE,
  };
};

const getSentryParams = (env = process?.env || {}): ISentryParams => {
  const { SENTRY_DSN, SENTRY_ENVIRONMENT, SENTRY_FILTER_LOCAL, SENTRY_SAMPLE_RATE, DISABLE_SENTRY, STAGE } =
    getEnvs(env);

  const sentryOptions = {
    dsn: SENTRY_DSN,
    environment: SENTRY_ENVIRONMENT,
    sampleRate: SENTRY_SAMPLE_RATE,
  };

  return {
    sendToSentry: isSentryEnabled(SENTRY_DSN, STAGE, SENTRY_FILTER_LOCAL, DISABLE_SENTRY),
    sentryOptions,
  };
};

export { getSentryParams, getEnvs };
