// jest.config.mjs
export default {
  testEnvironment: "jest-environment-jsdom",
  /* transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
 moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },*/
  setupFilesAfterEnv: [
    "@testing-library/jest-dom", // Correct the import here
  ],
  // Jest configuration
  moduleNameMapper: {
    "\\.css$": "<rootDir>/__mocks__/styleMock.js",
    "\\.module\\.css$": "<rootDir>/__mocks__/styleMock.js", // Optional: for CSS modules
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Ensure Babel processes JavaScript/JSX
  },
};
