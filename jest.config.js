module.exports = {
  testEnvironment: 'node',
  roots: ['./src'],
  preset: 'ts-jest',
  silent: false,
  verbose: true,
  collectCoverageFrom: ['src/**'],
  coverageReporters: ['text'],
  coverageThreshold: {
    global: {
      lines: 85,
    },
  },
};
