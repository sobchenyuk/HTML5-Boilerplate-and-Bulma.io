// gulp  component
const   gulp = require('gulp');
const   browserSync = require('browser-sync');

const   stylus = require('gulp-stylus');
const   autoprefixer = require('gulp-autoprefixer');
const   concat = require('gulp-concat');
const   cssmin = require('gulp-cssmin');


const   errorHandler = require('gulp-error-handle');

const   rename = require('gulp-rename');
const   plumber = require('gulp-plumber');
const   browserify = require('browserify');
const   babelify = require('babelify');
const   source = require('vinyl-source-stream');
const   watch = require('gulp-watch');
const   sourcemaps = require('gulp-sourcemaps');

const   extender = require('gulp-html-extend');

// gulp settings
const   livereliad = browserSync.create();
const   reload = livereliad.reload;
const path = {
    app: {
        styl: './src/stylus/',
        js: './src/js/',
        html: './src/view/'
    },
    dist: {
        js: './js/',
        css: './css/',
        html: './*.html'
    },
    libCss: [
        'node_modules/normalize.css/normalize.css',
        'node_modules/bulma/css/bulma.min.css'
    ]
};

// name tasks
const HTML = 'html';
const FILE_INCLUDE = 'fileinclude';
const BROWSER_SYNC = 'browser-sync';
const JAVA_SCRIPT = 'javascript';
const STYLUS = 'stylus';
const WATCHER = 'watcher';
const DEFAULT = 'default';

// name task javascript
const TYPE_FILE = '.js';
const ARRAY_TYPE_FILE = [...TYPE_FILE];

// error
const onError = err => {
    console.log(err);

    this.emit('end');
};
var swallowError = function(err) {
    gulputil.log(err.toString());
    this.emit('end');
};

// gulp TASKS

// Static server
gulp.task(BROWSER_SYNC, () => {
  livereliad.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });
});

// script
gulp.task(JAVA_SCRIPT, () => {
    browserify({
        entries: `${path.app.js}app${TYPE_FILE}`,
        extensions: ARRAY_TYPE_FILE,
        debug: true,
        sourceMaps: true
    }).transform(babelify, {
        presets: ['@babel/env'],
        plugins: [
            "syntax-class-properties",
            "transform-class-properties"
        ]
    })
        .bundle()
        .pipe(plumber())
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({stream: true}));
});

// stylus
gulp.task(STYLUS, () => {
    gulp.src(`${path.app.styl}master.styl`)
        .pipe(plumber())
        .pipe(sourcemaps.init())
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
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({stream: true}));
});

// concat min rename lib css
gulp.task(
    'lib:css', ()=> gulp.src(path.libCss)
        .pipe(concat("lib.css"))
        .pipe(errorHandler())
        .pipe(cssmin())
        .pipe(rename( {
            suffix: ".min"
        }))
        .pipe(gulp.dest(path.dist.css))
);


gulp.task(HTML, function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch(`${path.dist.html}`, { ignoreInitial: false })
        .pipe(reload({stream: true}));
});


// fileinclude
gulp.task(FILE_INCLUDE, function() {
    gulp.src([`${path.app.html}*.html`])
        .pipe(plumber(function (error) {
            console.log(error.message);
            this.emit('end');
        }))
        .pipe(extender({
            annotations:true,
            verbose:false
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('./'))
        .pipe(reload({stream: true}));
});

// watcher
gulp.task( WATCHER, () => {
    watch(`${path.app.styl}/**/*.styl`, () => gulp.start(STYLUS));
    watch(`${path.app.js}/**/*.js`, () => gulp.start(JAVA_SCRIPT));
    watch(`${path.dist.html}`, () => gulp.start(HTML));
    watch(`${path.app.html}**/*.html`, () => gulp.start(FILE_INCLUDE));
});

gulp.task(
  DEFAULT,
   [
      WATCHER,
      BROWSER_SYNC,
      STYLUS,
      JAVA_SCRIPT,
      FILE_INCLUDE,
      'lib:css'
    ]
);

