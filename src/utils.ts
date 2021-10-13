/**
 * Handy function to check if we are sending to Sentry
 * @param sentryDSN - Sentry endpoint must be present
 * @param stage - deployment stage
 * @param filterLocal - filter Sentry alerts for local environments only
 * @param disableSentry - disable sentry even when deployed
 */
const isSentryEnabled = (sentryDSN: string, stage: string, filterLocal: string, disableSentry: string): boolean => {
  if (!sentryDSN || disableSentry === 'true' || (stage === 'local' && filterLocal === 'true')) {
    return false;
  }
  return true;
};

export { isSentryEnabled };
