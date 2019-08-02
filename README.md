## HTML5 Boilerplate &amp; Bulma.io NEW RELASE

[![N|Solid](https://github.com/sobchenyuk/HTML5-Boilerplate-and-Bulma.io/blob/master/HTML5-Boilerplate-and-Bulma.io.png)](https://vk.com/bulmaio)

# Installation

```sh
$ git clone https://github.com/sobchenyuk/HTML5-Boilerplate-and-Bulma.io.git
$ cd HTML5-Boilerplate-and-Bulma.io
$ npm install && npm run dev
```

# Gulp 

```sh
$ npm run dev OR gulp default
```

## gulpfile.js

```sh
const   gulp = require('gulp');
const   browserSync = require('browser-sync');

const   stylus = require('gulp-stylus');
const   autoprefixer = require('gulp-autoprefixer');
const   concat = require('gulp-concat');
const   cssmin = require('gulp-cssmin');

const   rename = require('gulp-rename');
const   plumber = require('gulp-plumber');
const   browserify = require('browserify');
const   babelify = require('babelify');
const   source = require('vinyl-source-stream');
const   watch = require('gulp-watch');
const   sourcemaps = require('gulp-sourcemaps');

const   extender = require('./html-extend');
```

## gulp-html-extend
