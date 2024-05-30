import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  coverageDirectory: 'coverage',
  collectCoverage: true,
  verbose: true,
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '@/(.*)': ['<rootDir>/src/$1'],
  },
  testMatch: ['<rootDir>/src/tests/**/*.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/__tests__/*.ts?(x)', '!**/node_modules/**'],
  // coverageThreshold: {
  //   global: {
  //     branches: 1,
  //     functions: 1,
  //     lines: 1,
  //     statements: 1,
  //   },
  // },
  coverageReporters: ['text-summary', 'lcov'],
};

export default config;
