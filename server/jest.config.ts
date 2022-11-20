import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
  ],
  rootDir: './src',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    'config': '<rootDir>/config/config.ts',
  },
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
