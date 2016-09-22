var gulp = require('gulp');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');
var cleanCSS = require('gulp-clean-css');
var Couleurs = require('couleurs'); Couleurs.proto();
var size = require('gulp-filesize');
var uglify = require('gulp-uglify');
var pug = require('gulp-pug');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var rename = require("gulp-rename");

var paths = {
	stylusWatch: 'stylus/**/*.styl',
	stylusEntry: 'stylus/main.styl',
	browserifyEntry: 'js/app.js',
	jsWatch: 'js/**/*.js',
	pugWatch: './**.pug',
	destination: 'src/',
};

gulp.task('stylus-compile' , function() {
	console.log("Compiling Stylus".fg(0, 255, 0));
	return gulp.src(paths.stylusEntry)
		.pipe(stylus())
		.pipe(cleanCSS({debug: true}, function(details) {
			console.log(details.name.toString().fg(155, 255, 0) + ' - ' + details.stats.originalSize.toString().fg(255, 100, 0) + ' -> ' + details.stats.minifiedSize.toString().fg(50, 255, 100));
		}))
		.pipe(gulp.dest(paths.destination))
		.pipe(size())
		.on('error', errorHandle);
});

gulp.task('javascript-compile' , function() {
	console.log("Compiling Javascript".fg(0, 255, 0));
    return browserify({entries: paths.browserifyEntry, debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename("all.js"))
        .pipe(size())
        .pipe(gulp.dest(paths.destination))
});


gulp.task('pug-compile' , function() {
	console.log("Compiling Pug".fg(0, 255, 0));
	return gulp.src( paths.pugWatch)
		.pipe(pug())
		.pipe(htmlmin())
		.pipe(gulp.dest('./'))
		.pipe(size())
		.on('error', errorHandle);	
});


gulp.task('watch' ,function() {
	gulp.watch(paths.stylusWatch, ['stylus-compile']);
	gulp.watch(paths.jsWatch, ['javascript-compile']);
	gulp.watch(paths.pugWatch, ['pug-compile']);
});

gulp.task('default', ['watch', 'stylus-compile', 'javascript-compile', 'pug-compile']);


function errorHandle(error)
{
	console.log("Error:"+error.toString().fg(255,0,0));
	this.emit('end');
}