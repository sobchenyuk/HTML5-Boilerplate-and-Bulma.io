## HTML5 Boilerplate &amp; Bulma.io NEW RELASE

[![N|Solid](./HTML5-Boilerplate-and-Bulma.io.png)](https://www.facebook.com/HTML5BoilerplateandBulma.io)

# Installation

```sh
$ git clone https://github.com/sobchenyuk/HTML5-Boilerplate-and-Bulma.io.git
$ cd HTML5-Boilerplate-and-Bulma.io
$ npm i
```

# Gulp 

```sh
$ npm run dev OR gulp
```

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
import prettify from 'gulp-html-prettify';
```

# gulp-twig
## Usage
```sh
{# index.twig #}
{% extends "layout.twig" %}

{% set title = "my site" %}
 
{% block page %}
    <header>
        <h1>Gulp and Twig.js</h1>
    </header>
    <p>
        This page is generated by Twig.js using the gulp-twig gulp plugin.
    </p>
{% endblock %}
```

```sh
{# layout.twig #}
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="description" content="A demo of how to use gulp-twig"/>
    <meta name="author" content="Simon de Turck"/>
    <meta name="viewport" content="width=device-width,initial-scale=1">
 
    <title>{{ title }}</title>
 
</head>
<body>
<section>
    {% block page %}{% endblock %}
</section>
</body>
</html>
```