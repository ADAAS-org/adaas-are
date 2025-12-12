import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    verbose: true,

    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleNameMapper: {
        "@adaas/are/constants/(.*)": ["<rootDir>/src/constants/$1"],
        "@adaas/are/decorators/(.*)": ["<rootDir>/src/decorators/$1"],
        "@adaas/are/types/(.*)": ["<rootDir>/src/types/$1"],
        "@adaas/are/helpers/(.*)": ["<rootDir>/src/helpers/$1"],
        "@adaas/are/defaults/(.*)": ["<rootDir>/src/defaults/$1"],

        "@adaas/are/context/(.*)": ["<rootDir>/src/context/$1"],
        "@adaas/are/components/(.*)": ["<rootDir>/src/components/$1"],
        "@adaas/are/containers/(.*)": ["<rootDir>/src/containers/$1"],
        "@adaas/are/entities/(.*)": ["<rootDir>/src/entities/$1"],
        "@adaas/are/channels/(.*)": ["<rootDir>/src/channels/$1"],
    }

};
export default config;