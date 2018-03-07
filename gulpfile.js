'use strict';

var gulp = require('gulp');

// Include Our Plugins
var plugins = require('gulp-load-plugins')({
	scope: ['dependencies'],
	pattern: ['*']
});

// load package info
var pkgConfig = require('./package.json');

plugins.assembleConfig = function(name, callback) {

	var dataPath = (function(env_name) {
		if (env_name === 'test') {
			return './resources/config-test.json';
		}
		return './resources/config.' + name + '.json';
	})(name);

	var params = require(dataPath);

	var replaceList = [
		['%APP_VERSION%', pkgConfig.version]
	];

	for (var param in params) {
		var val = params[param];
		replaceList.push(['%'+param.toUpperCase()+'%', val]);
	}

	gulp.src(dataPath)
		.pipe(plugins.rename('data.json'))
		.pipe(gulp.dest('./resources/'));

	gulp.src('resources/config.js')
		.pipe(plugins.batchReplace(replaceList))
		.pipe(gulp.dest('app/scripts/'));

	setTimeout(callback, 2000);
};

plugins.assemblePages = function(name, callback) {
	var assemble = plugins.assemble();

	assemble.partials('resources/templates/partials/*.hbs');
	assemble.layouts('resources/templates/layouts/*.hbs');
	assemble.pages('resources/templates/*.hbs');
	assemble.data('./resources/data.json');

	assemble.toStream('pages')
		.pipe(assemble.renderFile())
		.pipe(plugins.extname())
		.pipe(assemble.dest('./app'));

	setTimeout(callback, 2000);
};

// wiredep
gulp.task('wiredep', function() {
	var wiredepOptions = {
		src: 'app/index.html',
		json: require("./bower.json"),
		directory: "bower_components",
		ignorePath: /\.\.\//
	};

	return plugins.wiredep(wiredepOptions);
});

gulp.task('wiredep-test', function() {
	var wiredepOptions = {
		src: 'test/karma.conf.js',
		json: require("./bower.json"),
		directory: "bower_components",
		ignorePath: /\.\.\//,
		fileTypes: {
			js: {
				block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
				detect: {
					js: /'(.*\.js)'/gi
				},
				replace: {
					js: '\'{{filePath}}\','
				}
			}
		}
	};

	return plugins.wiredep(wiredepOptions);
});

gulp.task('inject-scripts', function() {
	var folders = [
		'app/scripts/config.js',
		'app/scripts/app.js',
		'app/scripts/configuration/**/*.js',
		'app/scripts/components/**/*.js',
		'app/scripts/directives/**/*.js',
		'app/scripts/filters/**/*.js',
		'app/scripts/services/**/*.js',
		'app/scripts/controllers/index.js',
		'app/scripts/controllers/**/*.js'
	];

	return gulp.src('./app/index.html')
		.pipe(plugins.inject(gulp.src(folders, {
			read: false
		}), {
			name: 'inject-scripts',
			relative: true
		}))
		.pipe(gulp.dest('./app/'));
});

gulp.task('usemin', function() {
	return gulp.src('app/index.html')
		.pipe(plugins.usemin({
			css: [plugins.cssmin, plugins.rev],
			js: [plugins.uglify, plugins.rev]
		}))
		.pipe(gulp.dest('./dist/'));
});

// Clean dev
gulp.task('clean-dev', function() {
	return gulp.src(['app/*.html'], {
			read: false
		})
		.pipe(plugins.clean());
});

// Clean Build
gulp.task('clean', function() {
	return gulp.src(['dist/*', 'dist/*.*'], {
			read: false
		})
		.pipe(plugins.clean());
});

// Clean after build
gulp.task('clean-after', function() {
	gulp.src(['app/scripts/templates.js'], {
			read: false
		})
		.pipe(plugins.clean());
});

gulp.task('copy-resources', function() {
	var translations = [
		'bower_components/angular-i18n/angular-locale_en.js',
		'bower_components/angular-i18n/angular-locale_ja.js'
	];

	gulp.src('bower_components/font-awesome/fonts/*.*')
		.pipe(gulp.dest('dist/fonts/font-awesome/'));

	gulp.src(translations)
		.pipe(gulp.dest('dist/data/translations/'));

	gulp.src('app/images/**/*')
		.pipe(gulp.dest('dist/images/'));

	gulp.src('resources/favicons/**/*')
		.pipe(gulp.dest('dist/favicons/'));

	return gulp.src('resources/web.config')
		.pipe(gulp.dest('dist/'));
});

gulp.task('copy-dev-resources', function() {
	return gulp.src('resources/web.config')
		.pipe(gulp.dest('app/'));
});

gulp.task('copy-test-resources', function() {
	var translations = [
		'bower_components/angular-i18n/angular-locale_en.js',
		'bower_components/angular-i18n/angular-locale_ja.js'
	];

	return gulp.src(translations)
			.pipe(gulp.dest('app/data/translations/'));
});

// compile the project's styles
gulp.task('build-styles', function() {
	var postCssPlugins = [
		plugins.autoprefixer({browsers: pkgConfig.browserList})
	];

	return gulp.src('./app/styles/base/*.less')
		.pipe(plugins.less({
			paths: ['bower_components']
		}))
		.pipe(plugins.postcss(postCssPlugins))
		.pipe(gulp.dest('./app/styles'));
});

// compile the project's templates
gulp.task('build-templates', function() {
	var params = require('./resources/config.dist.json');
	var filename = 'templates.js',
		options = {
			root: 'views/',
			moduleSystem: 'IIFE',
			module: params.app_name
		};
	return gulp.src('app/views/**/*.html')
		.pipe(plugins.angularTemplatecache(filename, options))
		.pipe(gulp.dest('app/scripts/'));
});

// launch the lite server
gulp.task('server', function(callback) {
	var port = pkgConfig.app && pkgConfig.app.port ? parseInt(pkgConfig.app.port) : 9000;

	plugins.connect.server({
		root: 'app',
		livereload: true,
		port: port,
		middleware: function(connect) {
			// Add path to bower components and other resources
			return [
				connect().use('/bower_components', plugins.serveStatic('./bower_components')),
				connect().use('/data/translations/', plugins.serveStatic('./bower_components/angular-i18n')),
				connect().use('/scripts/templates.js', plugins.serveStatic('./resources/templates.js')),
				connect().use('/fonts/font-awesome/', plugins.serveStatic('./bower_components/font-awesome/fonts/')),
				connect().use('/favicons/', plugins.serveStatic('./resources/favicons/')),
			];
		}
	});
	callback();
});

gulp.task('eslint', function() {
  return gulp.src([
      './gulpfile.js',
      './app/scripts/**/*.js'
    ])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});


gulp.task('livereload', function() {
	return gulp.src('app/index.html')
		.pipe(plugins.connect.reload());
});

gulp.task('build-dist-env', function(callback) {
	plugins.assembleConfig('dist', function() {
		plugins.assemblePages('dist', callback);
	});
});

gulp.task('build-dev-env', function(callback) {
	plugins.assembleConfig('dev', function() {
		plugins.assemblePages('dev', callback);
	});
});

gulp.task('build-test-env', function(callback) {
	plugins.assembleConfig('test', function() {
		plugins.assemblePages('test', callback);
	});
});

gulp.task('watch-changes', function() {
	gulp.watch(['gulpfile.js', 'package.json', 'bower.json'], function() {
		plugins.runSequence('inject-scripts', 'wiredep', 'livereload', 'eslint');
	});

	gulp.watch(['app/scripts/**/*.js'], function() {
		plugins.runSequence('inject-scripts', 'eslint', 'livereload');
	});

	gulp.watch(['app/styles/base/**/*.less'], function() {
		plugins.runSequence('build-styles', 'livereload');
	});

	gulp.watch(['app/**/*.html'], function() {
		plugins.runSequence('livereload');
	});
});

// setup test environment
gulp.task('test', function(cb) {
	plugins.runSequence(
		'copy-test-resources',
		'build-test-env',
		cb
	);
});

// setup dev environment and launch server
gulp.task('dev', function(cb) {
	plugins.runSequence(
		'clean-dev',
		'build-dev-env',
		'inject-scripts',
		'wiredep',
		'wiredep-test', ['build-styles', 'copy-dev-resources'],
		cb
	);
});

// build the distributable package of the frontend site
gulp.task('dist', function() {
	plugins.runSequence(
		'clean',
		['build-dist-env', 'copy-resources'],
		'inject-scripts',
		'wiredep',
		'build-templates',
		'usemin',
		'clean-after'
	);
});

gulp.task('serve', function() {
	plugins.runSequence('dev', 'server', 'watch-changes');
});

gulp.task('default', ['dev']);
