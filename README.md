
# md-components

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/HBM/md-components.svg?branch=master)](https://travis-ci.org/HBM/md-components)
[![npm](https://img.shields.io/npm/v/md-components.svg)](https://www.npmjs.com/package/md-components)
[![Coverage Status](https://coveralls.io/repos/github/HBM/md-components/badge.svg)](https://coveralls.io/github/HBM/md-components)
[![Code Climate](https://codeclimate.com/github/HBM/md-components/badges/gpa.svg)](https://codeclimate.com/github/HBM/md-components)

## Installation

NodeJS >= 6 is required for automatically installing all peer dependencies.

```bash
$ npm install --save md-components
```

## Usage

`/js/index.js`

```js
import React from 'react'
import {Button} from 'md-components'


class App extends React.Component {

  onClick = () => {
    console.log('clicked')
  }

  render() {
    return (
      <div>
        <Button onClick={this.onClick}>
          Hello
        </Button>
      </div>
    )
  }

}
```

`/css/index.scss`

```scss
@import "../node_modules/md-components/css/base";
@import "../node_modules/md-components/button/Button";
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

```
$ make watch
$ make css
$ make serve
```

- [Google Material Design](https://www.google.com/design/spec/material-design/introduction.html)
- use [Sass](http://sass-lang.com/)
- follow [SUIT CSS](https://suitcss.github.io/) guidelines

### New release

[np - A better npm publish](https://github.com/sindresorhus/np)

```
$ np
```
