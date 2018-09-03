module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|giff|webp|svg)$':
      '@coco-platform/jest-tools/lib/asset-transformer.js',
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.css$': '@coco-platform/jest-tools/lib/css-ignore.js',
    '\\.pcss': '@coco-platform/jest-tools/lib/css-modules.js',
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
