// jest.config.mjs
export default {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: [
    "@testing-library/jest-dom", // Correct the import here
    "<rootDir>/src/setupTests.js", // Add this line to include the setup file
  ],
  // Jest configuration
  moduleNameMapper: {
    "\\.css$": "<rootDir>/__mocks__/styleMock.js",
    "\\.module\\.css$": "<rootDir>/__mocks__/styleMock.js", // Optional: for CSS modules,
    "\\.(jpg|jpeg|png|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Ensure Babel processes JavaScript/JSX
  },
};
