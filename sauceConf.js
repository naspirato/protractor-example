// solves `SyntaxError: Unexpected token import`
require("babel-register")({
    presets: [ 'es2015' ]
});

exports.config = {
    specs: ['specs/*Spec.js'],
    baseUrl: 'http://qualityshepherd.com/angular',

    /**
     * to run on sauceLabs, create two env vars with your username and key
     *
     * eg.
     * `export SAUCE_USERNAME=<your username>
     */
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    onPrepare: function(){

        var AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
          resultsDir: 'allure-results'
        }));
    },

    multiCapabilities: [{
        'browserName' : 'chrome'
    }, {
      /*   'browserName': 'firefox',
        'platform': 'Linux',
        'version': '45',
        'name': 'Linux/Firefox...' */
    }],

    jasmineNodeOpts: {
        isVerbose: true,
        includeStackTrace: true,
        showColors: false,
        defaultTimeoutInterval: 30000
    }
};
