const config = {
    moduleFileExtensions: ['ts', 'tsx', 'json', 'js', 'jsx'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    rootDir: './',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$'
};

module.exports = config;
