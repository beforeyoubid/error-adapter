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
}

const errorTypesForSentry = [
  ErrorCode.AUTHORIZATION_ERROR,
  ErrorCode.EXTERNAL_API_ERROR,
  ErrorCode.SYSTEM_ERROR,
  ErrorCode.SERVER_ERROR,
];
const errorTypesToIncludeDetails = [ErrorCode.VALIDATION_ERROR];

export { ErrorCode, errorTypesForSentry, errorTypesToIncludeDetails };
