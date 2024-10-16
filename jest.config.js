export default {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.styles.*",
    "!src/main.tsx",
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/.jest/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png|webp)$": "<rootDir>/.jest/fileMock.js",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "@pages": "<rootDir>/src/pages",
    "@routes": "<rootDir>/src/routes",
    "@components": "<rootDir>/src/components",
    "@constants": "<rootDir>/src/constants",
    "@providers": "<rootDir>/src/providers",
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
