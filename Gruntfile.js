'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths for the application
	var appConfig = {
		firebase: 'firebase',
		firebasedist: 'firebasedist'
	};

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		appConfig: appConfig,

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: ['app/scripts/**/*.js'],
				tasks: ['newer:concat', 'uglify', 'test'],
				options: {livereload: '<%= connect.options.livereload %>'}
			},
			html: {
				files: ["app/**/*.html"],
				tasks: ["htmlmin", 'copy:dist'],
				options: {
					spawn: true,
					livereload: false
				}
			},
			reports: {
				files: [
					"test/coverage/html/*",
					"test/unit-tests/*"
				],
				options: {
					livereload: true
				}
			},
			styles: {
				files: ['app/less/**/*.less'],
				tasks: ['csscomb:app', 'less', 'cssmin', 'autoprefixer'],
				options: {livereload: '<%= connect.options.livereload %>'}
			},
			images: {
				files: ['app/images/*'],
				tasks: ['newer:imagemin', 'newer:svgmin', 'test'],
				options: {livereload: '<%= connect.options.livereload %>'}
			},
			gruntfile: {
				files: ['Gruntfile.js'],
				tasks: ['build'],
				options: {livereload: '<%= connect.options.livereload %>'}
			},
			livereload: {
				options: {livereload: '<%= connect.options.livereload %>'},
				files: [
					'app/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				],
				tasks: ['newer:copy']
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				//hostname: 'localhost',
				hostname: '0.0.0.0'
				//hostname: '192.168.0.10',
				//livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					base: "dist"
				}
			},
			test: {
				options: {
					port: 3000,
					base: 'dist'
				}
			},
			dist: {
				options: {
					open: true,
					base: 'dist'
				}
			},
			firebase: {
				options: {
					base: 'dist'
				}
			}
		},

		'ftp-deploy': {
			flan: {
				auth: {
					host: 'ftp.flanstudios.com',
					port: 21,
					authKey: 'key1'
				},
				src: './dist/',
				dest: '/public_html/'
			},
			flanTest: {
				auth: {
					host: 'ftp.flanstudios.com',
					port: 21,
					authKey: 'key1'
				},
				src: './dist/',
				dest: '/public_html/testEnv/'
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'dist/**/*',
						'!dist/.git*'
					]
				}]
			},
			firebase: {
				files: [{
					dot: true,
					src: [
						'<%= appConfig.firebasedist %>/{,*/}*',
						'!<%= appConfig.firebasedist %>/.git*'
					]
				}]
			}
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'dist/',
					src: 'styles.css',
					dest: 'dist/'
				}]
			}
		},

		less: {
			dist: {
				files: {'dist/styles.css': ['app/less/styles.less']}
			}
		},

		uglify: {
			dist: {
				files: {'dist/scripts.js': ['dist/scripts.js']}
			}
		},

		concat: {
			dist: {
				files: {'dist/scripts.js': ['app/scripts/**/*.js']}
			}
		},

		cssmin: {
			dist: {
				files: {'dist/styles.css': ['dist/styles.css']}
			}
		},

		csscomb: {
			options: {
				config: '.csscomb.json'
			},
			app: {
				expand: true,
				cwd: "app/less/",
				src: ['*.less'],
				dest: "app/less/"
			}
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'app/',
					src: '**/*.{png,jpg,jpeg,gif}',
					dest: 'dist/'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'app/',
					src: '{,*/}*.svg',
					dest: 'dist/'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: 'app',
					src: ['*.html', '**/*.html'],
					dest: 'dist'
				}]
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'app',
					dest: 'dist',
					src: [
						//'**/*.{ico,png,txt}',
						'**/*.{ico,txt}',
						'.htaccess',
						//'*.html',
						//'components/{,*/}*.html',
						//'images/{,*/}*.{webp}',
						'fonts/*'
						//'images/*'
					]
				}]
			},
			extras: {
				files: [{
					expand: true,
					dot: true,
					cwd: './',
					dest: 'dist',
					src: [
						'README.md',
						'lib/*'
					]
				}]
			},
			firebase: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= appConfig.firebase %>',
					dest: '<%= appConfig.firebasedist %>',
					src: [
						'*.html'
					]
				}]
			}
		},

		// Automated testing frameworks

		jasmine: {
			unitTest: {
				files: [
					{
						expand: true,
						cwd: "app/scripts",
						src: ['/**/*.js']
					}
				],
				options: {
					specs: 'test/unit/*.spec.js'
				}
			}
		},

		karma: {
			unit: {
				configFile: '.karma.js'
			}
		},

		accessibility: {
			options: {
				force: true,
				accessibilityLevel: "WCAG2A",
				reportType: "json",
				reportLevels: {
					notice: true,
					warning: true,
					error: true
				},
				reportLocation: "test/reports/accessibility",
				ignore: [
					"WCAG2A.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl",
					"WCAG2A.Principle3.Guideline3_1.3_1_1.H57.2"
				]
			},
			test: {
				options: {
					urls: ['<%= connect.options.test %>']
				}
			},
			local: {
				src: ["app/index.html", "app/pages/**/*.html"]
			}
		}

	});

	grunt.registerTask('start', 'Compile then start a connect web server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([ 'build', 'connect:livereload', 'watch' ]);
	});

	grunt.registerTask('build', [ 'clean:dist', 'concat', 'copy:dist', 'copy:extras', 'csscomb:app', 'less', 'autoprefixer', 'cssmin', 'uglify', 'imagemin:dist', 'svgmin:dist', 'htmlmin' ]);

	grunt.registerTask('test', [ 'karma:unit', 'connect:test', 'accessibility:test' ]);

	grunt.registerTask('default', [ 'build' ]);

	grunt.registerTask('firebase-update', [ 'clean:firebase', 'copy:firebase', 'concat-json:firebase', 'connect:firebase:keepalive' ]);
};
