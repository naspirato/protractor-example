exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'jasmine2',
  // Capabilities to be passed to the webdriver instance.

    multiCapabilities : [
      {
        'browserName' : 'chrome'
      }, /* {
        'browserName' : 'internet explorer'
        
      } */
    ],

  baseUrl: "http://localhost/addressbook",
  onPrepare: function () {

   
    
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));

    require('./test/functions/util').clearTempData()

    browser.getCapabilities().then(async function(c) {
    
     let browserName = await c.get('browserName');
     browser.browserName = browserName
     
     browser.width = 1920
     browser.height = 1080
     browser.manage().window().setSize(browser.width, browser.height);
     /* browser.screenshotNamePostfix = `-${browserName}-${browser.width}x${browser.height}-dpr-1.png`
     const protractorImageComparison = require('protractor-image-comparison');
     browser. protractorImageComparison = new protractorImageComparison(
         {
             baselineFolder: './test/data/screenshots/',
             screenshotPath: './test/temp/'
         }
     ); */

  })

  
  },


  jasmineNodeOpts: {
    showColors: true,
    displaySpecDuration: true,
     // overrides jasmine's print method to report dot syntax for custom reports
    //print: () => {},
    defaultTimeoutInterval: 50000
  },
 
 
 
  specs: ['./test/tests/login.test.js']

  };
 