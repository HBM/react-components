
# md-components

[![Greenkeeper badge](https://badges.greenkeeper.io/HBM/md-components.svg)](https://greenkeeper.io/)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/HBM/md-components.svg?branch=master)](https://travis-ci.org/HBM/md-components)
[![npm](https://img.shields.io/npm/v/md-components.svg)](https://www.npmjs.com/package/md-components)
[![Coverage Status](https://coveralls.io/repos/github/HBM/md-components/badge.svg)](https://coveralls.io/github/HBM/md-components)
[![Code Climate](https://codeclimate.com/github/HBM/md-components/badges/gpa.svg)](https://codeclimate.com/github/HBM/md-components)

![](https://github.com/HBM/md-components/blob/master/examples/public/img/screencast.gif)

## Installation

```bash
$ npm install --save md-components
```

## Usage

`/js/index.js`

```js
import React from 'react'
import ReactDOM from 'react-dom'
import {Shell} from 'md-components'

class App extends React.Component {

  render() {
    return (
      <Shell title='my app'>
        <div>hello world</div>
      </Shell>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'))
```

`/css/index.scss`

```scss
@import "../node_modules/md-components/css/base";
```

## Fonts

The 'Roboto' font must be provided separetely and is not part of the package, e.g.:

```css
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700');
```

## Custom colors / Theming

md-components uses six colors:

 - primary
 - primary dark
 - primary light
 - accent
 - acent dark
 - accent light

The font color can be either "White" or "Black" and must be specified for each color respectively.
Your main sass file might look like this:

```scss
@import "node_modules/md-components/css/base";

/* provide your custom colors */
$color-primary: #1B325F;
$color-primary-text: White;

$color-primary--dark: #303F9F;
$color-primary-text--dark: White;

$color-primary--light: #E8EAF6;
$color-primary-text--light: Black;

$color-accent: #FF4081;
$color-accent-text: White;

$color-accent--dark: #F50057;
$color-accent-text--dark: White;

$color-accent--light: #FF80AB;
$color-accent-text--light: Black;

@import "node_modules/md-components/components/header/Header";
@import "node_modules/md-components/components/navigation/Navigation";
```

The [Google material color](https://github.com/danlevan/google-material-color) package provides convenient access to the "official" google color palette:

```scss
@import "palette";
@import "node_modules/md-components/css/base";

/* provide your custom colors */
$color-primary: palette(Indigo, 500);
$color-primary-text: White;

$color-primary--dark: palette(Indigo, 700);
$color-primary-text--dark: White;

$color-primary--light: palette(Indigo, 50);
$color-primary-text--light: Black;

$color-accent: palette(Pink, A200);
$color-accent-text: White;

$color-accent--dark: palette(Pink, A400);
$color-accent-text--dark: White;

$color-accent--light: palette(Pink, A100);
$color-accent-text--light: Black;

@import "node_modules/md-components/components/header/Header";
@import "node_modules/md-components/components/navigation/Navigation";
```

## Development

You have to [link](https://docs.npmjs.com/cli/link) `md-components` into the `./examples` folder. You cannot use a relative path from `./examples` to the `./src` since `create-react-app` will throw an error.

> Module not found: You attempted to import ... which falls outside of the project src/ directory. Relative imports outside of src/ are not supported. You can either move it inside src/, or add a symlink to it from project's node_modules/.

The following tasks are available:
- `test` - Run tests & coverage report `npm run test`
- `lib` - Build lib `npm run lib`
- `lib:watch`- Watch `npm lib:watch`
- `examples` - Run examples `npm run examples`
- `stylelint` - Runs `npm run stylelint`

# More Documents
- [Google Material Design](https://www.google.com/design/spec/material-design/introduction.html)
- use [Sass](http://sass-lang.com/)
- follow [SUIT CSS](https://suitcss.github.io/) guidelines
- [Webpack](https://webpack.github.io/), module bundler.

### New release

[np - A better npm publish](https://github.com/sindresorhus/np)

```
$ np
```
