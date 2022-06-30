import {
  ActivityLogError,
  APIFailureActivityLogError,
  DBActivityLogError,
  EmailActivityLogError,
  ExternalAPIAuthenticationFailActivityLogError,
  InternalAPIFailureActivityLogError,
  InvestorOptOutActivityError,
  MissingExternalResourceActivityLogError,
  MissingFieldActivityLogError,
  PermanentActivityLogError,
  RedisActivityLogError,
  SMSActivityLogError,
} from './../src/errors';
import {
  ConflictError,
  ExternalApiError,
  NotAuthenticated,
  NotAuthorized,
  NotFound,
  SystemError,
  UserInputError,
  ValidationError,
} from '../src/errors';
import { ErrorCode } from '../src/constants';
import { convertErrorToCode, getErrorType, isSentryLevelError } from '../src/utils';
import { GraphQLError } from 'graphql';

describe('convertErrorToCode()', () => {
  it('Not Authenticated', () => {
    const error = new NotAuthenticated('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.AUTHENTICATION_ERROR);
  });
  it('Not Authorized', () => {
    const error = new NotAuthorized('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.AUTHORIZATION_ERROR);
  });
  it('Not Found', () => {
    const error = new NotFound('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.NOT_FOUND_ERROR);
  });
  it('Validation Error', () => {
    const error = new ValidationError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.VALIDATION_ERROR);
  });
  it('Bad User Input', () => {
    const error = new UserInputError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.BAD_USER_INPUT);
  });
  it('Conflict Error', () => {
    const error = new ConflictError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.CONFLICT_ERROR);
  });
  it('System Error', () => {
    const error = new SystemError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.SYSTEM_ERROR);
  });
  it('External API Error', () => {
    const error = new ExternalApiError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.EXTERNAL_API_ERROR);
  });
  it('Activity Log Error', () => {
    const error = new ActivityLogError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.ACTIVITY_LOG_ERROR);
  });
  it('Permanent Activity Log Error', () => {
    const error = new PermanentActivityLogError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.PERMANENT_ACTIVITY_LOG_ERROR);
  });
  it('API Failure Activity Log Error', () => {
    const error = new APIFailureActivityLogError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.API_FAILURE_ACTIVITY_LOG_ERROR);
  });
  it('Missing Field Activity Log Error', () => {
    const error = new MissingFieldActivityLogError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.MISSING_FIELD_ACTIVITY_LOG_ERROR);
  });
  it('External API Authentication Fail Activity Log Error', () => {
    const error = new ExternalAPIAuthenticationFailActivityLogError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.EXTERNAL_API_AUTHENTICATION_FAIL_ACTIVITY_LOG_ERROR);
  });
  it('Missing External Resource Activity Log Error', () => {
    const error = new MissingExternalResourceActivityLogError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.MISSING_EXTERNAL_RESOURCE_ACTIVITY_LOG_ERROR);
  });
  it('Internal API Failure Activity Log Error', () => {
    const error = new InternalAPIFailureActivityLogError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.INTERNAL_API_FAILURE_ACTIVITY_LOG_ERROR);
  });
  it('Email Activity Log Error', () => {
    const error = new EmailActivityLogError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.EMAIL_ACTIVITY_LOG_ERROR);
  });
  it('SMS Activity Log Error', () => {
    const error = new SMSActivityLogError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.SMS_ACTIVITY_LOG_ERROR);
  });
  it('DB Activity Log Error', () => {
    const error = new DBActivityLogError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.DB_ACTIVITY_LOG_ERROR);
  });
  it('Redis Activity Log Error', () => {
    const error = new RedisActivityLogError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.REDIS_ACTIVITY_LOG_ERROR);
  });
  it('InvestorOptOutActivityError', () => {
    const error = new InvestorOptOutActivityError('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.INVESTOR_OPT_OUT_ACTIVITY_LOG_ERROR);
  });
  it('error defaults to null', () => {
    const error = new Error('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(null);
  });
  it('no error defaults to null', () => {
    const error: any = null;
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(null);
  });
});

describe('getErrorType()', () => {
  it('Not Authenticated', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.AUTHENTICATION_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(NotAuthenticated);
  });
  it('Not Authorized', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.AUTHORIZATION_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(NotAuthorized);
  });
  it('Not Found', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.NOT_FOUND_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(NotFound);
  });
  it('Validation Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.VALIDATION_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(ValidationError);
  });
  it('Bad User Input', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.BAD_USER_INPUT,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(UserInputError);
  });
  it('Conflict Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.CONFLICT_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(ConflictError);
  });
  it('System Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.SYSTEM_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(SystemError);
  });
  it('External API Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.EXTERNAL_API_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(ExternalApiError);
  });
  it('Activity Log Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.ACTIVITY_LOG_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(ActivityLogError);
  });
  it('Permanent Activity Log Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.PERMANENT_ACTIVITY_LOG_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(PermanentActivityLogError);
  });
  it('API Failure Activity Log Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.API_FAILURE_ACTIVITY_LOG_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(APIFailureActivityLogError);
  });
  it('Missing Field Activity Log Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.MISSING_FIELD_ACTIVITY_LOG_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(MissingFieldActivityLogError);
  });
  it('External API Authentication Fail Activity Log Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.EXTERNAL_API_AUTHENTICATION_FAIL_ACTIVITY_LOG_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(ExternalAPIAuthenticationFailActivityLogError);
  });
  it('Missing External Resource Activity Log Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.MISSING_EXTERNAL_RESOURCE_ACTIVITY_LOG_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(MissingExternalResourceActivityLogError);
  });
  it('Internal API Failure Activity Log Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.INTERNAL_API_FAILURE_ACTIVITY_LOG_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(InternalAPIFailureActivityLogError);
  });
  it('Email Activity Log Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.EMAIL_ACTIVITY_LOG_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(EmailActivityLogError);
  });
  it('SMS Activity Log Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.SMS_ACTIVITY_LOG_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(SMSActivityLogError);
  });
  it('DB Activity Log Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.DB_ACTIVITY_LOG_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(DBActivityLogError);
  });
  it('Redis Activity Log Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.REDIS_ACTIVITY_LOG_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(RedisActivityLogError);
  });
  it('InvestorOptOutActivityError', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.INVESTOR_OPT_OUT_ACTIVITY_LOG_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(InvestorOptOutActivityError);
  });
  it('Server Error', () => {
    const error = new GraphQLError('GraphQL Error', null, null, null, null, null, {
      code: ErrorCode.SERVER_ERROR,
    });
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(Error);
  });
  it('no error defaults to Server Error', () => {
    const error = new GraphQLError('GraphQL Error');
    const type = getErrorType(error);
    const errorOfType = new type('testing this little error');

    expect(errorOfType).toBeInstanceOf(Error);
  });
});

describe('isSentryLevelError()', () => {
  describe('Sentry level errors', () => {
    it('regular error i.e. server error', () => {
      const error = new Error('Critical error to report!!!!!!!!');

      const isSentryLevel = isSentryLevelError(error);

      expect(isSentryLevel).toBeTruthy();
    });
  });
  describe('Non Sentry level errors', () => {
    it('not authorized', () => {
      const error = new NotAuthenticated('User not authenticated');

      const isSentryLevel = isSentryLevelError(error);

      expect(isSentryLevel).toBeFalsy();
    });
    it('permanent activity log', () => {
      const error = new PermanentActivityLogError('Permanent activity log error');

      const isSentryLevel = isSentryLevelError(error);

      expect(isSentryLevel).toBeFalsy();
    });
    it('activity log', () => {
      const error = new ActivityLogError('Activity log error');

      const isSentryLevel = isSentryLevelError(error);

      expect(isSentryLevel).toBeFalsy();
    });
    it('investor opt out activity', () => {
      const error = new InvestorOptOutActivityError('Investor opt out activity log error');

      const isSentryLevel = isSentryLevelError(error);

      expect(isSentryLevel).toBeFalsy();
    });
  });
});
