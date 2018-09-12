// gulp  component
const   gulp = require('gulp');
const   browserSync = require('browser-sync');
const   stylus = require('gulp-stylus');
const   autoprefixer = require('gulp-autoprefixer');
const   plumber = require('gulp-plumber');
const   browserify = require('browserify');
const   babelify = require('babelify');
const   source = require('vinyl-source-stream');

// gulp settings
const   livereliad = browserSync.create();
const   reload = livereliad.reload;
const path = {
    app : {
      styl: './src/stylus/',
      js: './src/js/'
    },
    dist: {
      js: './js/',
      css: './css/',
    }
}

// name tasks
const BROWSER_SYNC = 'browser-sync';
const JAVA_SCRIPT = 'javascript';
const STYLUS = 'stylus';
const WATCHER = 'watcher';
const DEFAULT = 'default';

// type of file project
const TYPE_FILE = '.js';

// gulp TASKS

// Static server
gulp.task(BROWSER_SYNC, () => {
  livereliad.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });
   gulp.watch("index.html").on('change', reload);
});

// script
gulp.task(JAVA_SCRIPT, () => {
  browserify({entries: `${path.app.js}app${TYPE_FILE}`, extensions: [TYPE_FILE], debug: true})
  .transform(babelify,{
    presets: ['@babel/env'],
    plugins: [
      "syntax-class-properties",
      "transform-class-properties"
  ]
  })
  .bundle()
  .pipe(plumber())
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(`${path.dist.js}`))
  .pipe(livereliad.stream({once: true}));
});

// stylus
gulp.task(STYLUS, () => {
    gulp.src(`${path.app.styl}master.styl`)
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
        .pipe(gulp.dest(path.dist.css))
        .pipe(livereliad.stream({once: true}));
});

// watcher
gulp.task(WATCHER, () => {
    gulp.watch(`${path.app.js}/**/*.js`, [JAVA_SCRIPT]);
    gulp.watch(`${path.app.styl}/**/*.styl`, [STYLUS]);
});

gulp.task(
  DEFAULT,
   [
      WATCHER,
      BROWSER_SYNC,
      JAVA_SCRIPT,
    ]
);

