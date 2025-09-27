/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '__tests__/factories.ts', '__tests__/setup.ts'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    rootDir: './',
    testMatch: ['<rootDir>/src/__tests__/**/*.test.ts']
}