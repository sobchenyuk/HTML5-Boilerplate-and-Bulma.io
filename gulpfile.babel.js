"use strict";

import gulp from 'gulp';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import watch from 'gulp-watch';
import twig from 'gulp-twig';

import stylus from 'gulp-stylus';
import autoprefixer from 'gulp-autoprefixer';

import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';


// gulp settings
const livereliad = browserSync.create();
const reload = livereliad.reload;
const path = {
    app: {
        styl: './src/stylus/',
        js: './src/js/',
        twig: './src/views/'
    },
    dist: {
        js: './js/',
        css: './css/',
        html: './'
    }
};


// name tasks
const BROWSER_SYNC = 'browser-sync';
const JAVA_SCRIPT = 'javascript';
const HTML = 'html';
const STYLUS = 'stylus';
const WATCHER = 'watcher';
const DEFAULT = 'default';
const TYPE_FILE = '.js';

// Static server
gulp.task(
    BROWSER_SYNC, () => {
    livereliad.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });
});

// script
gulp.task(
    JAVA_SCRIPT, () => {
    browserify({
        entries: `${path.app.js}app${TYPE_FILE}`,
        extensions: [TYPE_FILE],
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
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({stream: true}));
});

// HTML
gulp.task(
    HTML, () => gulp.src(`${path.app.twig}*.twig`)
        .pipe(plumber())
        .pipe(twig())
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({stream: true}))
);

// stylus
gulp.task(
    STYLUS, () => gulp.src(`${path.app.styl}master.styl`)
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
        .pipe(reload({stream: true}))
);

gulp.task(
    WATCHER, () => {
    watch(`${path.app.styl}/**/*.styl`, () => gulp.start(STYLUS));
    watch(`${path.app.js}/**/*.js`, () => gulp.start(JAVA_SCRIPT));
    watch(`${path.app.twig}/**/*.twig`, () => gulp.start(HTML));
});

gulp.task(
    DEFAULT,
    [
        WATCHER,
        BROWSER_SYNC,
        STYLUS,
        JAVA_SCRIPT,
        HTML
    ]
);