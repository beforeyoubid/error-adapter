import {
  ConflictError,
  convertErrorToCode,
  NotAuthenticated,
  NotAuthorized,
  NotFound,
  UserInputError,
  ValidationError,
} from '../src/errors';

import { ErrorCode } from '../src/constants';

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
