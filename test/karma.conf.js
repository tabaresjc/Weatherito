// Karma configuration
// Generated on 2017-08-01

module.exports = function(config) {
	'use strict';

	config.set({
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// base path, that will be used to resolve files and exclude
		basePath: '../',

		// testing framework to use (jasmine/mocha/qunit/...)
		// as well as any additional frameworks (requirejs/chai/sinon/...)
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [
			// bower:js
			'bower_components/jquery/dist/jquery.js',
			'bower_components/bootstrap/dist/js/bootstrap.js',
			'bower_components/angular/angular.js',
			'bower_components/angular-route/angular-route.js',
			'bower_components/angular-sanitize/angular-sanitize.js',
			'bower_components/angular-cookies/angular-cookies.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-translate/angular-translate.js',
			'bower_components/angular-ui-router/release/angular-ui-router.js',
			'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
			'bower_components/angular-ui-select/dist/select.js',
			'bower_components/angular-dynamic-locale/src/tmhDynamicLocale.js',
			// endbower
			'app/scripts/config.js',
			'app/scripts/app.js',
			'app/scripts/configuration/**/*.js',
			'app/scripts/components/**/*.js',
			'app/scripts/directives/**/*.js',
			'app/scripts/filters/**/*.js',
			'app/scripts/services/**/*.js',
			'app/scripts/controllers/index.js',
			'app/scripts/controllers/**/*.js',
			'test/spec/**/*.js',
			// assets
			{
				pattern: 'app/data/translations/*.js',
				watched: false,
				included: false,
				served: true,
				nocache: false
			}
		],

		// list of files / patterns to exclude
		exclude: [],

		proxies: {
			"/data/translations/": '/base/app/data/translations/'
		},

		// web server port
		port: 9100,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],

		// Which plugins to enable
		plugins: [
			'karma-jasmine',
			'karma-junit-reporter',
			'karma-chrome-launcher',
			'karma-phantomjs-launcher',
			'karma-coverage'
		],

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true,

		// To output to Jenkins
		reporters: ['progress', 'junit', 'coverage'],

		preprocessors: {
			'app/**/*.js': ['coverage']
		},

		junitReporter: {
			outputDir: 'test/reports/', // results will be saved as $outputDir/$browserName.xml
			outputFile: 'test-results.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
			useBrowserName: false,
		},

		coverageReporter: {
			dir: 'test/coverage/',
			type: 'html',
			subdir: '.',
			useBrowserName: false,
		},

		colors: true,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,

		// Uncomment the following lines if you are using grunt's server to run the tests
		// proxies: {
		//   '/': 'http://localhost:9000/'
		// },
		// URL root prevent conflicts with the site root
		// urlRoot: '_karma_'
	});
};
