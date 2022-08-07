export default {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
