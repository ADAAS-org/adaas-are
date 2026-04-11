import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
   displayName: 'adaas-a-concept',
    preset: 'ts-jest',
    testEnvironment: 'node',
    resetModules: true,
    rootDir: '.',
    testMatch: ['<rootDir>/tests/**/*.test.ts'],
    setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
    moduleNameMapper: {
        "@adaas/are/helpers/(.*)": "<rootDir>/src/helpers/$1",
        "@adaas/are/constants/(.*)": "<rootDir>/src/constants/$1",
        "@adaas/are/containers/(.*)": "<rootDir>/src/containers/$1",
        "@adaas/are/loader/(.*)": "<rootDir>/src/lib/AreLoader/$1",
        "@adaas/are/tokenizer/(.*)": "<rootDir>/src/lib/AreTokenizer/$1",
        "@adaas/are/compiler/(.*)": "<rootDir>/src/lib/AreCompiler/$1",
        "@adaas/are/transformer/(.*)": "<rootDir>/src/lib/AreTransformer/$1",
        "@adaas/are/interpreter/(.*)": "<rootDir>/src/lib/AreInterpreter/$1",
        "@adaas/are/lifecycle/(.*)": "<rootDir>/src/lib/AreLifecycle/$1",
        "@adaas/are/component/(.*)": "<rootDir>/src/lib/AreComponent/$1",
        "@adaas/are/event/(.*)": "<rootDir>/src/lib/AreEvent/$1",
        "@adaas/are/node/(.*)": "<rootDir>/src/lib/AreNode/$1",
        "@adaas/are/store/(.*)": "<rootDir>/src/lib/AreStore/$1",
        "@adaas/are/scene/(.*)": "<rootDir>/src/lib/AreScene/$1",
        "@adaas/are/instruction/(.*)": "<rootDir>/src/lib/AreInstruction/$1",
        "@adaas/are/syntax/(.*)": "<rootDir>/src/lib/AreSyntax/$1",
        "@adaas/are/attribute/(.*)": "<rootDir>/src/lib/AreAttribute/$1",
        "@adaas/are/watcher/(.*)": "<rootDir>/src/lib/AreWatcher/$1",
        "@adaas/are/signals/(.*)": "<rootDir>/src/lib/AreSignals/$1",
        "@adaas/are/engine/(.*)": "<rootDir>/src/lib/AreEngine/$1",
        "@adaas/are/engines/html/(.*)": "<rootDir>/src/engines/html/$1",
    },
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts']
};
export default config;