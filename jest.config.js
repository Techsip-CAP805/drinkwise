module.exports = {
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    testEnvironment: "jest-environment-jsdom"
  };
  