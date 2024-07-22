const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: true,
  coverageDirectory: ['<rootDir>/coverage', '<rootDir>/dist/coverage'],
  coverageReporters: ['text', 'lcov'],
};
