// jest.config.mjs
export default {
  testEnvironment: "jest-environment-jsdom", // Explicitly reference the jsdom environment
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
