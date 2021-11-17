export class ActivityLogError extends Error {
  public name: string = 'ActivityLogError';
}
export class PermanentActivityLogError extends ActivityLogError {
  public name: string = 'PermanentActivityLogError';
}
export class APIFailureActivityLogError extends ActivityLogError {}
export class MissingFieldActivityLogError extends ActivityLogError {}
export class ExternalAPIAuthenticationFailActivityLogError extends ActivityLogError {}
export class MissingExternalResourceActivityLogError extends ActivityLogError {}
export class InternalAPIFailureActivityLogError extends ActivityLogError {}
export class EmailActivityLogError extends ActivityLogError {}
export class SMSActivityLogError extends ActivityLogError {}
export class DBActivityLogError extends ActivityLogError {}
export class RedisActivityLogError extends ActivityLogError {}
export class InvestorOptOutActivityError extends ActivityLogError {
  public name: string = 'InvestorOptOutActivityError';
}
