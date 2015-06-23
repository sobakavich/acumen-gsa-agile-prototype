var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	del = require('del');

// path variables
var app = {
	source: {
		scripts: "public/app/**/*.js",
		styles: "public/stylesheets/**/*.css"
	},
	dest: {
		scripts: "public/dist/js",
		styles: "public/dist/css"
	}
};

var libs = {
	source: {
		scripts: ["public/libs/**/*.min.js", '!public/libs/bootstrap/**/*.js'],
		styles: "public/libs/**/*.min.css",
		fonts: ["public/libs/bootstrap/fonts/**/*.*", "public/libs/font-awesome/fonts/**/*.*"]
	},
	dest: {
		scripts: "public/dist/js",
		styles: "public/dist/css",
		fonts: "public/dist/fonts"
	},
	bootstrap: {
    	main: 'public/libs/bootstrap/less/bootstrap.less',
    	dir:  'public/libs/bootstrap/less',
    	dest: 'public/stylesheets'
  	}
};

// Compile styles
gulp.task('styles', ['styles:app', 'styles:libs']);

gulp.task('styles:app', function() {
	return gulp.src(app.source.styles)
		.pipe(concat('app.css'))
		.pipe(gulp.dest(app.dest.styles))
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(app.dest.styles));
});

gulp.task('styles:libs', function() {
	return gulp.src(libs.source.styles)
		.pipe(concat('base.min.css'))
		.pipe(gulp.dest(libs.dest.styles));
});

/*gulp.task('bootstrap', function() {
    return gulp.src(libs.bootstrap.main)
        .pipe(less({
            paths: [libs.bootstrap.dir]
        }))
        .on('error', handleError)
        .pipe(gulp.dest(libs.bootstrap.dest));
});*/


// compile script files
gulp.task('scripts', ['scripts:app', 'scripts:libs']);

gulp.task('scripts:app', function() {
	return gulp.src(app.source.scripts)
		.pipe(concat('app.js'))
		.pipe(gulp.dest(app.dest.scripts))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(app.dest.scripts));
});

gulp.task('scripts:libs', function() {
	return gulp.src(libs.source.scripts)
		.pipe(concat('base.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(libs.dest.scripts));
});

// fonts
gulp.task('fonts', function() {
	return gulp.src(libs.source.fonts)
		.pipe(gulp.dest(libs.dest.fonts));
});


// Lint Task
gulp.task('lint', function() {
	return gulp.src('public/app/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Clean task
gulp.task('clean', function() {
	del([app.dest.scripts + '/**/*',
		app.dest.styles + '/**/*',
		libs.dest.scripts + '/**/*',
		libs.dest.styles + '/**/*',
		libs.dest.fonts + '/**/*']);
});

// watch task
gulp.task('watch', function() {
	gulp.watch([app.source.scripts, libs.source.scripts], ['lint', 'scripts']);
	gulp.watch([app.source.styles, libs.source.styles], ['styles']);
});


// default task
gulp.task('default', ['clean', 'lint', 'styles', 'scripts', 'fonts', 'watch']);


// Error handler
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}