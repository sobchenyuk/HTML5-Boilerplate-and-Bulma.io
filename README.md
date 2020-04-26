# Gulp 3, Edge.js from Adonis.js, Stylus, SCSS

```sh
dev version
$ npm run dev OR gulp
======================
prod version
$ npm run prod OR gulp build
```
***
| warning |
| ------ |
| Using styles or scripts in the template, turn them around with special tags.|
| Example: |
```
<!DOCTYPE html>
<html>
<head>

<!-- build:css -->
	<link rel="stylesheet" href="css/your_style.css">
	<link rel="stylesheet" href="css/your_style.css">
	<link rel="stylesheet" href="css/your_style.css">
<!-- endbuild -->

</head>
<body>

<!-- build:js -->
		<script src="css/your_javascript.js">
		<script src="css/your_javascript.js">
		<script src="css/your_javascript.js">
<!-- endbuild -->

</body>
</html>
```
***
## gulpfile.babel.js

Indented code

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


# Connected Modules
##javascript module
```sh
jQuery JavaScript Library v3.3.1
Modernizr v3
Plugin console
```
##style module
```sh
normalize.css v8.0.1
```

#In the project are used
```sh
es6 | ECMAScript 6
JS modules
-----------------------------
Syntax
import defaultExport from "module-name"; 
import * as name from "module-name"; 
import { export } from "module-name"; 
import { export as alias } from "module-name"; 
import { export1 , export2 } from "module-name"; 
import { export1 , export2 as alias2 , [...] } from "module-name"; 
import defaultExport, { export [ , [...] ] } from "module-name"; 
import defaultExport, * as name from "module-name"; 
import "module-name";
```

++++++++++++++++++++++++++++++++++++++++++++++++

# CSS preprocessors
## STYLUS http://stylus-lang.com/
## SCSS https://sass-lang.com/guide

+++++++++++++++++++++++++++++++++++++++++++++++++

# gulp-edgejs << template engine >>
[Edge.js template engine](http://edge.adonisjs.com)
## Basic Example
```sh
{# Layout File #}
<!DOCTYPE html>
<html lang="en">
  <head>
	<title>{{ title }} - HTML5 Boilerplate & Bulma.io</title>
  </head>
  <body>
	@!section('vars')

    <header class="header">
    </header>

    <div class="container">
      <aside class="sidebar">
        @section('sidebar') 
          <p> The default sidebar content </p>
        @endsection
      </aside>

      <div class="content">
        @!section('content') 
      </div>
    </div>
  </body>
</html>
```

```sh
{# Template File #}
@layout('master')

@section('vars')
    @set( 'title', 'Home Page' )
@endsection

@section('content')
  <p> Content area </p>
@endsection
```

```sh
{# Output #}
<!DOCTYPE html>
<html lang="en">
  <head>
  <title>Home Page - HTML5 Boilerplate & Bulma.io</title>
  </head>
  <body>
    <header class="header">
    </header>

    <div class="container">
      <aside class="sidebar">
        <p> The default sidebar content </p>
      </aside>

      <div class="content">
        <p> Content area </p>
      </div>
    </div>
  </body>
</html>
```
