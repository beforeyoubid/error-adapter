import { getSentryParams, getEnvs } from '../src/params';

describe('getEnvs()', () => {
  it('should return SENTRY_FILTER_LOCAL field if provided', () => {
    const res = getEnvs({ SENTRY_FILTER_LOCAL: 'false' });
    expect(res.SENTRY_FILTER_LOCAL).toEqual('false');
  });
  it('should return SENTRY_FILTER_LOCAL=true if NOT provided', () => {
    const res = getEnvs();
    expect(res.SENTRY_FILTER_LOCAL).toEqual('true');
  });

  it('should return SENTRY_SAMPLE_RATE field if provided', () => {
    const res = getEnvs({ SENTRY_SAMPLE_RATE: '0.1' });
    expect(res.SENTRY_SAMPLE_RATE).toEqual('0.1');
  });
  it('should return SENTRY_SAMPLE_RATE=1.0 if NOT provided', () => {
    const res = getEnvs();
    expect(res.SENTRY_SAMPLE_RATE).toEqual('1.0');
  });

  it('should return SENTRY_DSN field if provided', () => {
    const res = getEnvs({ SENTRY_DSN: 'test' });
    expect(res.SENTRY_DSN).toEqual('test');
  });
  it('should NOT return SENTRY_DSN if NOT provided', () => {
    const res = getEnvs();
    expect(res.SENTRY_DSN).toEqual('');
  });

  it('should return SENTRY_ENVIRONMENT field if provided', () => {
    const res = getEnvs({ SENTRY_ENVIRONMENT: 'local' });
    expect(res.SENTRY_ENVIRONMENT).toEqual('local');
  });
  it('should return n/a SENTRY_ENVIRONMENT if NOT provided', () => {
    const res = getEnvs();
    expect(res.SENTRY_ENVIRONMENT).toEqual('n/a');
  });

  it('should return DISABLE_SENTRY field if provided', () => {
    const res = getEnvs({ DISABLE_SENTRY: 'true' });
    expect(res.DISABLE_SENTRY).toEqual('true');
  });
  it('should return DISABLE_SENTRY=false if NOT provided', () => {
    const res = getEnvs();
    expect(res.DISABLE_SENTRY).toEqual('false');
  });
});

describe('getSentryParams()', () => {
  it('should return correctly parsed dsn, environment, and sampleRate if provided', () => {
    const simulatedEnv = {
      SENTRY_DSN: 'test',
      SENTRY_ENVIRONMENT: 'local',
      SENTRY_SAMPLE_RATE: '1.0',
    };
    const res = getSentryParams(simulatedEnv);
    expect(res.sentryOptions.dsn).toEqual('test');
    expect(res.sentryOptions.environment).toEqual('local');
    expect(res.sentryOptions.sampleRate).toEqual('1.0');
  });
  it('should return default dsn, environment, and sampleRate if NOT provided', () => {
    const res = getSentryParams();
    expect(res.sentryOptions.dsn).toEqual('');
    expect(res.sentryOptions.environment).toEqual('n/a');
    expect(res.sentryOptions.sampleRate).toEqual('1.0');
  });
});
