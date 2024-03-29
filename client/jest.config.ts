import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json',
  ],
  rootDir: './src',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    's3/(.*)$': '<rootDir>/services/s3/$1.ts',
  },
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
  ],
  globalSetup: '<rootDir>/test/loadEnvConfig.ts',
  testEnvironment: 'node',
};

export default config;
