import { ISentryParams } from '../types';
import { handleBeforeSend } from './sentry';

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
    beforeSend: handleBeforeSend,
  };

  return {
    sendToSentry: isSentryEnabled(SENTRY_DSN, STAGE, SENTRY_FILTER_LOCAL, DISABLE_SENTRY),
    sentryOptions,
  };
};

/**
 * Handy function to check if we are sending to Sentry
 * @param sentryDSN - Sentry endpoint must be present
 * @param stage - deployment stage
 * @param filterLocal - filter Sentry alerts for local environments only
 * @param disableSentry - disable Sentry
 */
const isSentryEnabled = (sentryDSN: string, stage: string, filterLocal: string, disableSentry: string): boolean => {
  if (!sentryDSN || disableSentry === 'true' || (stage === 'local' && filterLocal === 'true')) {
    return false;
  }
  return true;
};

export { getSentryParams, getEnvs, isSentryEnabled };
