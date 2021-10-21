
export interface ISentryOptions {
  dsn: string;
  environment: string;
  sampleRate: string | number;
  beforeSend: Function;
}

export interface ISentryParams {
  sendToSentry: boolean;
  sentryOptions: ISentryOptions;
}
