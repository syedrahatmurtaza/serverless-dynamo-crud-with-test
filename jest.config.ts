import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "@functions/(.*)": "<rootDir>/src/functions/lambda/$1",
    "@libs/(.*)": "<rootDir>/src/libs/$1",
    "@constants/(.*)": "<rootDir>/src/constants/$1",
  },
};
export default config;
