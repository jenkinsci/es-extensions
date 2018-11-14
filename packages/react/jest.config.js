const config = {
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
		"^.+\\.jsx?$": "babel-jest"
	},
	testPathIgnorePatterns: [
		"/node_modules/",
		"/dist/"
    ],
    setupFiles: ["./scripts/setupTests.js"],
    setupTestFrameworkScriptFile: "jest-enzyme",
    testEnvironment: "enzyme",
	testEnvironmentOptions: {
		"enzymeAdapter": "react15.4"
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$"
}

module.exports = config;