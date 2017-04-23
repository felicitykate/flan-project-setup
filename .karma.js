// Karma configuration
//https://karma-runner.github.io/0.12/config/configuration-file.html

module.exports = function (config) {

	config.commonConfig = {

		/* Paths to libraries to load before source JS and tests.
		 * e.g jquery
		 */
		libraryPaths: [


		],

		//Path to test files
		testPaths: [
			"test/unit/*.spec.js"
		],

		// Paths to files that will be unit tested and coverage
		componentJSPattern: [
			// Paths to clientlibs js files

			// Paths to components js files
			"app/scripts/**/*.js"

		],

		//Create the coverage config for sources
		coveragePaths: function coveragePaths() {
			return config.commonConfig.componentJSPattern.reduce(function (previousValue, currentValue) {
				previousValue[currentValue] = ['coverage'];
				return previousValue
			}, {});
		}
	};

	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: config.commonConfig.componentJSPattern.concat(
			config.commonConfig.testPaths),

		// Paths to clientlibs js files to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: config.commonConfig.coveragePaths(),

		// test results reporter to use
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['coverage', 'html', 'spec', 'junit'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		//browsers: ['Chrome', 'Firefox', 'PhantomJS'],
		browsers: ['PhantomJS'],

		//Coverage reporter https://github.com/karma-runner/karma-coverage
		coverageReporter: {
			dir: 'test/reports',
			reporters: [
				{ type: 'html', subdir: '/coverage/html' },
				{ type: 'cobertura', subdir: '/coverage/cobertura', file: 'cobertura-nabrwd_designs.xml' },
				{ type: 'text' },
				{ type: 'lcov', subdir: '/coverage/lcov' }
			],
			includeAllSources: true
		},

		junitReporter: {
			outputDir: 'test/reports/coverage'
		},

		// spec reporter https://www.npmjs.com/package/karma-spec-reporter
		specReporter: {
			// limit number of lines logged per test
			maxLogLines: 5,
			// do not print error summary
			suppressErrorSummary: true,
			// do not print information about failed tests
			suppressFailed: false,
			// do not print information about passed tests
			suppressPassed: false,
			// do not print information about skipped tests
			suppressSkipped: true,
			// print the time elapsed for each spec
			showSpecTiming: false
		},

		// html reporter https://www.npmjs.com/package/karma-html-reporter
		htmlReporter: {
			outputDir: 'test/reports',
			// set if you moved jasmine_template.html
			templatePath: null,
			// reports show failures on start
			focusOnFailures: true,
			// name files instead of creating sub-directories
			namedFiles: false,
			// page title for reports; browser info by default
			pageTitle: null,
			// simply replaces spaces with _ for files/dirs
			urlFriendlyName: false,
			// report summary filename; browser info by default
			reportName: 'unit-tests',

			// experimental
			// folded suites stay folded
			preserveDescribeNesting: false,
			// reports start folded (only with preserveDescribeNesting)
			foldAll: false,
		},

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		plugins: [
			'karma-jasmine',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher',
			'karma-junit-reporter',
			'karma-coverage',
			'karma-html-reporter',
			'karma-spec-reporter'
		]
	});
};
