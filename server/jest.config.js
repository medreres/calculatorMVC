// const jestModuleNameMapper = require("jest-module-name-mapper");

module.exports = {
  transform: { "^.+\\.ts?$": "ts-jest" },
  // testEnvironment: "node",
  testRegex: ".*\\.(test|spec)?\\.(ts|tsx)$",
  // moduleNameMapper: jestModuleNameMapper(),
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
