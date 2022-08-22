const esModules = ['@amcharts'].join('|');

module.exports = {
  preset: 'jest-preset-angular',
  clearMocks: true,
  testMatch: ['**/*.spec.[tj]s'],
  setupFiles: ['<rootDir>/jest-globals.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  moduleFileExtensions: ['ts', 'js'],
  coverageReporters: ['html', 'json-summary', 'text-summary', 'lcov'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/builds/'],
  coveragePathIgnorePatterns: ['<rootDir>/spark-client-framework/', '<rootDir>/tailwind.config.js', '<rootDir>/src/app/utils/chart-lib/'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  moduleNameMapper: {
    '^@service(.*)$': `<rootDir>/src/app/service/$1`,
    '^@module(.*)$': `<rootDir>/src/app/modules/$1`,
    '^@directive(.*)$': `<rootDir>/src/app/directives/$1`,
    '^@pipe(.*)$': `<rootDir>/src/app/pipes/$1`,
    '^@type(.*)$': `<rootDir>/src/app/types/$1`,
    '^@util(.*)$': `<rootDir>/src/app/utils/$1`,
    '^@app(.*)$': `<rootDir>src/app/$1`,
    '^@/(.*)$': `<rootDir>/src/$1`,
    '^uuid$': require.resolve('uuid'),
  },
  // transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
