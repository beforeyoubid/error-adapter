import { NodeOptions } from '@sentry/node';

export interface ISentryParams {
  sendToSentry: boolean;
  defaultSentryOptions: NodeOptions;
}
