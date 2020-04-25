"use strict";

// components
import gulp from 'gulp';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import watch from 'gulp-watch';

import concat from 'gulp-concat';
import cssmin from 'gulp-cssmin';

import changed from 'gulp-changed';

import stylus from 'gulp-stylus';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

import browserify from 'browserify';
import babelify from 'babelify';
import uglify from "gulp-uglify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";

import gulpEdge from 'gulp-edgejs';

import prettify from 'gulp-html-prettify';

import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';
import pngquant from 'imagemin-pngquant';

import htmlreplace from 'gulp-html-replace';

// import rimraf from 'rimraf';

sass.compiler = require('node-sass');


// gulp settings
const livereliad = browserSync.create();
const reload = livereliad.reload;
const path = {
    app: {
        styl: './resources/assets/stylus/',
        sass: './resources/assets/sass/',
        less: './resources/assets/sass/',
        js: './resources/assets/js/',
        edge: './resources/views/',
        images: './public/img/',
        fonts: './resources/assets/fonts/'
    },
    dist: {
        js: './public/js/',
        css: './public/css/',
        html: './public',
        fonts: './public/fonts/',
    },
    lib: {
        css: [
            'node_modules/normalize.css/normalize.css'
        ],
        js: [
            'node_modules/modernizr/bin/modernizr.js',
            'node_modules/jquery/dist/jquery.js'
        ],
        fonts: [

        ]
    },
    build: {
        js: './public/js/',
        css: './public/css/',
        public: './public/',
        images: './public/img',
        fonts: './public/fonts'
    }
};

// name tasks
const BROWSER_SYNC = 'browser-sync';
const JAVA_SCRIPT = 'javascript';
const EDGE = 'edge';
const STYLUS = 'stylus';
const SASS = 'sass';
const LIBS = 'libs';
const BUILD = 'build';
const WATCHER = 'watcher';
const DEFAULT = 'default';

// name task javascript
const TYPE_FILE = '.js';
// array type file javascript
const ARRAY_TYPE_FILE = [...TYPE_FILE];

// error message
const errorAlert = err => {
    console.log(err.toString());
    this.emit("end");
};


// Static server
gulp.task(
    BROWSER_SYNC, () => {
    livereliad.init({
        server: {
            baseDir: "./public"
        },
        host: 'localhost',
        port: 3000,
        logPrefix: "landing",
        reloadDelay: 1500
    });
});

// script
gulp.task(
    JAVA_SCRIPT, () => {
        browserify({
            entries: `${path.app.js}app${TYPE_FILE}`,
            extensions: ARRAY_TYPE_FILE,
            debug: true,
            sourcemaps: true

        }).transform(babelify, {
            presets: ['@babel/env'],
            plugins: [
                "syntax-class-properties",
                "transform-class-properties"
            ]
        }).bundle()
            .on('error', (err) => errorAlert.bind(err))
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(path.dist.js))
            .pipe(reload({stream: true}));
    });

// HTML
gulp.task(
    EDGE, ()=>  gulp.src(`${path.app.edge}*.edge`)
      .pipe( gulpEdge() )
      .pipe(prettify({
        max_preserve_newlines: 1,
        preserve_newlines: false,
        space_before_conditional: false,
        indent_with_tabs: true
    }).on('error', (err) => errorAlert.bind(err) ))
      .pipe(gulp.dest('./public'))
      .pipe(reload({stream: true}))
  );

// stylus
gulp.task(
    STYLUS, () => gulp.src(`${path.app.styl}all.styl`)
        .pipe(changed(path.dist.css))
        .pipe(plumber())
        .pipe(sourcemaps.init().on('error', (err) => errorAlert.bind(err) ))
        .pipe(stylus().on('error', (err) => errorAlert.bind(err) ))
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
        .pipe(sourcemaps.write('.').on('error', (err) => errorAlert.bind(err) ))
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({stream: true}))
);

// sass
gulp.task(SASS, () => gulp.src(`${path.app.sass}all.scss`)
        .pipe(changed(path.dist.css))
        .pipe(plumber())
        .pipe(sourcemaps.init().on('error', (err) => errorAlert.bind(err) ))
        .pipe(sass.sync().on('error', (err) => errorAlert.bind(err) ))
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
        .pipe(sourcemaps.write('.').on('error', (err) => errorAlert.bind(err) ))
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({stream: true}))
);

// concat min rename lib css
gulp.task(
    'lib:css', ()=> gulp.src(path.lib.css)
        .pipe(concat("lib.css"))
        .pipe(cssmin())
        .pipe(rename( {
            suffix: ".min"
        }))
        .pipe(gulp.dest(path.dist.css))
);


// concat min rename lib js
gulp.task(
    'lib:js', ()=> gulp.src(path.lib.js)
        .pipe(concat("lib.js"))
        .pipe(uglify())
        .pipe(rename( {
            suffix: ".min"
        }))
        .pipe(gulp.dest(path.dist.js))
);

// libs initialization
gulp.task(LIBS, ['lib:js', 'lib:css']);


// WATCHER
gulp.task(
    WATCHER, () => {
    watch(`${path.app.styl}/**/*.styl`, () => gulp.start(STYLUS));
    watch(`${path.app.sass}/**/*.scss`, () => gulp.start(SASS));
    watch(`${path.app.js}/**/*.js`, () => gulp.start(JAVA_SCRIPT));
    watch(`${path.app.edge}/**/*.edge`, () => gulp.start(EDGE));
    watch('./public/img/**/*.*', reload );
    watch(['!./public/**/*.*', './**/*.html', './favicon.*', '!node_modules/**/*'], reload );
});

// DEFAULT
gulp.task(
    DEFAULT,
    [
        WATCHER,
        BROWSER_SYNC,
        // STYLUS,
        SASS,
        JAVA_SCRIPT,
        EDGE,
        LIBS
    ]
);


// build tasks

// // clean build directory
// gulp.task('clean', (cb) => {
//     rimraf(path.build.public, cb)
// });

// image:build
gulp.task('image:build', () => {
    gulp.src(`${path.app.images}**/*.*`)
        .pipe(plumber().on('error', (err) => errorAlert.bind(err) ))
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })).on('error', (err) => errorAlert.bind(err) ))
        .pipe(gulp.dest(path.build.images))
        .on('end', () => console.log(' image optimization Finished '));
});

// html:build
gulp.task(
    'html:build', () => {gulp.src(['./public/**/*.html', './favicon.*', '!node_modules/**/*'])
        .pipe(plumber().on('error', (err) => errorAlert.bind(err) ))
		.pipe(htmlreplace({
			'css': 'css/bundle.min.css',
			'js': 'js/bundle.min.js'
		}))
        .pipe(gulp.dest(path.build.public));
});

// css:build
gulp.task(
    'css:build', ()=> gulp.src([`${path.dist.css}lib.min.css`, `${path.dist.css}all.css`])
        .pipe(concat("bundle.css"))
        .pipe(cssmin())
        .pipe(rename( {
            suffix: ".min"
        }))
        .pipe(gulp.dest(path.build.css))
);

// js:build
gulp.task(
    'js:build', ()=> gulp.src([
        `${path.dist.js}lib.min.js`,
        `${path.dist.js}plugins.js`,
        `${path.dist.js}main.js`,
        `${path.dist.js}bundle.js`
    ])
        .pipe(concat("bundle.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename( {
            suffix: ".min"
        }))
        .pipe(gulp.dest(path.build.js))
);

// fonts:build
gulp.task('fonts:build', ()=> gulp.src(`${path.dist.fonts}**/*.*`).pipe(gulp.dest(path.build.fonts)));

// run build
gulp.task(BUILD, ['fonts:build', 'css:build', 'js:build', 'html:build', 'image:build']);
