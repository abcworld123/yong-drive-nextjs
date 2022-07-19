import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
  ],
  rootDir: '.',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
  ],
  testEnvironment: 'node',
};

export default config;
