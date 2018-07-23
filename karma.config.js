module.exports = config => {
    config.set({
        basePath: '',
        reporters: ['mocha'],

        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,
        concurrency: Infinity,
        files: [
            'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.0/angular.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/angular-mocks/1.7.0/angular-mocks.js',
            './src/angular-dropdown.js',
            './test/*.spec.js',
        ],
        frameworks: ['jasmine'],
        browsers: ['Chrome']
    });
};
