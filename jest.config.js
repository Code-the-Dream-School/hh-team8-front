export default {
  testEnvironment: "jest-environment-jsdom", // Use the jsdom environment
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Transpile JS/JSX files using Babel
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // Extend Jest with matchers
  setupFiles: ["./jest.setup.js"],
};
