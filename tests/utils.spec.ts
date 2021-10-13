import { isSentryEnabled } from '../src/utils';

describe('isSentryEnabled()', () => {
  it('should return true if sentry DSN is provided, filterLocal is false, and disableSentry is false', () => {
    const DSN = 'test';
    const stage = 'local';
    const filterLocal = 'false';
    const disableSentry = 'false';
    const res = isSentryEnabled(DSN, stage, filterLocal, disableSentry);
    expect(res).toEqual(true);
  });
  it('should return false if sentry DSN is NOT provided, filterLocal is false, and disableSentry is false', () => {
    const DSN = '';
    const stage = 'local';
    const filterLocal = 'false';
    const disableSentry = 'false';
    const res = isSentryEnabled(DSN, stage, filterLocal, disableSentry);
    expect(res).toEqual(false);
  });
  it('should return false if sentry DSN is provided, filterLocal is true, and disableSentry is false', () => {
    const DSN = 'test';
    const stage = 'local';
    const filterLocal = 'true';
    const disableSentry = 'false';
    const res = isSentryEnabled(DSN, stage, filterLocal, disableSentry);
    expect(res).toEqual(false);
  });
  it('should return false if sentry DSN is provided, filterLocal is false, and disableSentry is true', () => {
    const DSN = 'test';
    const stage = 'local';
    const filterLocal = 'false';
    const disableSentry = 'true';
    const res = isSentryEnabled(DSN, stage, filterLocal, disableSentry);
    expect(res).toEqual(false);
  });
});
