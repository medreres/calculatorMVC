module.exports = {
  transform: { "^.+\\.ts?$": "ts-jest" },
  testEnvironment: "jsdom",
  testRegex: ".*\\.(test|spec)?\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.ts",
  },
};
