export interface ISentryOptions {
  dsn: string;
  environment: string;
  sampleRate: string | number;
  beforeSend: any;
}

export interface ISentryParams {
  sendToSentry: boolean;
  sentryOptions: ISentryOptions;
}
