/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/src/dist/"],
};

export default config;
