export interface ISentryOptions {
  dsn?: string;
  environment?: string;
  sampleRate?: string | number;
  beforeSend?: any;
  integrations?: [any];
  tracesSampleRate?: string | number;
  enabled?: boolean;
}

export interface ISentryParams {
  sendToSentry: boolean;
  defaultSentryOptions: ISentryOptions;
}
