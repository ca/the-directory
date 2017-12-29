var gulp        = require('gulp');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var minify      = require('gulp-minify-css');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var plumber     = require('gulp-plumber');

// Variables
var distDir = './public/dist';
var pkg = require('./package.json');

// Clean
gulp.task('clean', function() {
  del.sync([distDir]);
});


// Javascript
gulp.task('js', function() {
  gulp.src(
		   [
   './public/plugins/**/js/*.js',   
  ]) 
   .pipe(concat('plugins.min.js'))
  // .pipe(uglify())
    .pipe(gulp.dest(distDir + '/js'));
});

// Javascript
gulp.task('revjs', function() {
  gulp.src(
		   [
   './public/plugins/revolution/js/extensions/*.js',   
  ]) 
   .pipe(concat('revslider.min.js'))
  // .pipe(uglify())
    .pipe(gulp.dest(distDir + '/js'));
});

// CSS
gulp.task('css', function() {
   gulp.src(['./public/plugins/**/css/*.css'])   
    .pipe(concat('plugins.min.css'))
    // Original
    .pipe(gulp.dest(distDir + '/css'))
    // Minified
    .pipe(minify())    
    .pipe(gulp.dest(distDir + '/css'));
});

// sass
gulp.task('sass', function() {
  return gulp.src(
    ['./public/css/variables.scss',
  './public/css/common.scss',
'./public/css/header.scss',
   './public/css/style.scss',
  './public/css/footer.scss',
   './public/css/responsive.scss', 
  ])  
  .pipe(plumber())
  .pipe(concat('main.min.scss'))
    .pipe(sass(distDir.sassSrcPath, {
            style: 'compressed',
            loadPath: [distDir.sassImportsPath]
        }))    
    // Original
    .pipe(gulp.dest(distDir + '/css'))
    // Minified
  //  .pipe(minify())    
    .pipe(gulp.dest(distDir + '/css'));
});




// Watch
gulp.task('watch', ['js', 'revjs','css', 'sass'], function() {
  gulp.watch('./public/plugins/**/*', ['js']);
  gulp.watch('./public/plugins/**/**/*', ['revjs']);
  gulp.watch('./public/plugins/**/*', ['css']);
   gulp.watch('./public/css/**/*', ['sass']);
});


// Defaults
gulp.task('build', ['js', 'css', 'sass','revjs']);
gulp.task('default', ['build']);

