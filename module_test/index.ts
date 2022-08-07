import { Sentry } from '@beforeyoubid/error-adapter';
Sentry.captureException(new Error('fake exception!!'));
