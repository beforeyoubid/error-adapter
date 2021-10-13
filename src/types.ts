export interface ISentryOptions {
  dsn: string;
  environment: string;
  sampleRate: string | number;
}

export interface ISentryParams {
  sendToSentry: boolean;
  sentryOptions: ISentryOptions;
}
