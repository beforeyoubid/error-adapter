enum ErrorCode {
  AUTHENTICATION_ERROR = 'authentication_error',
  AUTHORIZATION_ERROR = 'authorization_error',
  NOT_FOUND_ERROR = 'not_found_error',
  VALIDATION_ERROR = 'validation_error',
  BAD_USER_INPUT = 'bad_user_input_error',
  CONFLICT_ERROR = 'conflict_error',
  PAYMENT_ERROR = 'payment_error',
  EXTERNAL_API_ERROR = 'external_api_error',
  SYSTEM_ERROR = 'system_error',
  SERVER_ERROR = 'server_error',
  // from byb-investors-api service
  ACTIVITY_LOG_ERROR = 'activity',
  PERMANENT_ACTIVITY_LOG_ERROR = 'permanent',
  API_FAILURE_ACTIVITY_LOG_ERROR = 'api_failure',
  MISSING_FIELD_ACTIVITY_LOG_ERROR = 'missing_field',
  EXTERNAL_API_AUTHENTICATION_FAIL_ACTIVITY_LOG_ERROR = 'api_auth_failure',
  MISSING_EXTERNAL_RESOURCE_ACTIVITY_LOG_ERROR = 'missing_external_resource',
  INTERNAL_API_FAILURE_ACTIVITY_LOG_ERROR = 'internal_api_failure',
  EMAIL_ACTIVITY_LOG_ERROR = 'email_failure',
  SMS_ACTIVITY_LOG_ERROR = 'sms_failure',
  DB_ACTIVITY_LOG_ERROR = 'db_failure',
  REDIS_ACTIVITY_LOG_ERROR = 'redis_failure',
  INVESTOR_OPT_OUT_ACTIVITY_LOG_ERROR = 'investor_opt_out',
}

const errorTypesForSentry = [
  ErrorCode.AUTHORIZATION_ERROR,
  ErrorCode.EXTERNAL_API_ERROR,
  ErrorCode.SYSTEM_ERROR,
  ErrorCode.SERVER_ERROR,
  // from byb-investors-api service
  ErrorCode.API_FAILURE_ACTIVITY_LOG_ERROR,
  ErrorCode.MISSING_FIELD_ACTIVITY_LOG_ERROR,
  ErrorCode.EXTERNAL_API_AUTHENTICATION_FAIL_ACTIVITY_LOG_ERROR,
  ErrorCode.MISSING_EXTERNAL_RESOURCE_ACTIVITY_LOG_ERROR,
  ErrorCode.INTERNAL_API_FAILURE_ACTIVITY_LOG_ERROR,
  ErrorCode.EMAIL_ACTIVITY_LOG_ERROR,
  ErrorCode.SMS_ACTIVITY_LOG_ERROR,
  ErrorCode.DB_ACTIVITY_LOG_ERROR,
  ErrorCode.REDIS_ACTIVITY_LOG_ERROR,
];
const errorTypesToIncludeDetails = [ErrorCode.VALIDATION_ERROR];

export { ErrorCode, errorTypesForSentry, errorTypesToIncludeDetails };
