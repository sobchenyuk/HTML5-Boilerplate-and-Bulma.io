## HTML5 Boilerplate &amp; Bulma.io NEW RELASE

[![N|Solid](https://github.com/sobchenyuk/HTML5-Boilerplate-and-Bulma.io/blob/master/HTML5-Boilerplate-and-Bulma.io.png)](https://vk.com/bulmaio)

# Installation

```sh
$ git clone https://github.com/sobchenyuk/HTML5-Boilerplate-and-Bulma.io
$ cd HTML5-Boilerplate-and-Bulma.io
$ git checkout site_creation
$ npm install && npm run dev
```

# Gulp 3

`$ npm run dev OR gulp default`

## gulpfile.babel.js

```sh
import gulp from 'gulp';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import watch from 'gulp-watch';
import twig from 'gulp-twig';
import concat from 'gulp-concat';
import cssmin from 'gulp-cssmin';

import stylus from 'gulp-stylus';
import autoprefixer from 'gulp-autoprefixer';

import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
```
