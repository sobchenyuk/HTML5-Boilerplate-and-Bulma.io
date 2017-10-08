var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber');
const babel = require('gulp-babel');

var path = {
 app : {
  css: "css/",
  styl: "stylus/master.styl"
 }
}

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });
   gulp.watch("index.html").on('change', browserSync.reload);
   gulp.watch("js/init.js").on('change', browserSync.reload);
});

gulp.task('vue', () =>
    gulp.src('vue/app.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('js/init.js'))
);

gulp.task('stylus', function(){
    gulp.src(path.app.styl)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: [
                'last 2 version',
                'Chrome >= 20',
                'Firefox >= 20',
                'Opera >= 12',
                'Android 2.3',
                'Android >= 4',
                'iOS >= 6',
                'Safari >= 6',
                'Explorer >= 8'
            ],
            cascade: false
        }))
        .pipe(gulp.dest(path.app.css))
        .pipe(browserSync.stream({once: true}));
});

gulp.task('watcher',function(){
    gulp.watch('stylus/**/*.styl', ['stylus']);
});

gulp.task('default', ['watcher', 'browser-sync']);