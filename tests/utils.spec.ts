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
  it('error defaults to server error', () => {
    const error = new Error('testing this little error');
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.SERVER_ERROR);
  });
  it('no error defaults to server error', () => {
    const error: any = null;
    const code = convertErrorToCode(error);

    expect(code).toStrictEqual(ErrorCode.SERVER_ERROR);
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
  });
});
