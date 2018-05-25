module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.pcss$': 'identity-obj-proxy',
  },
  // Coverage report
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.jsx'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html'],
  // Test configuration
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\]'],
  // Coverage report
  // Test configuration
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/__tests__/**/*.spec.js',
    '<rootDir>/__tests__/**/*.spec.jsx',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/es/'],
};
