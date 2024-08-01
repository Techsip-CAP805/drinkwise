const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: './',
});

// Add any custom config to be passed to Jest
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: './test-reports', outputName: 'results.xml' }]
  ],
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
