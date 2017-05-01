# react-colorizer

[![Build Status](https://travis-ci.org/opensource-cards/react-colorizer.svg?branch=master)](https://travis-ci.org/opensource-cards/react-colorizer)
[![npm package](https://badge.fury.io/js/react-colorizer.svg)](https://www.npmjs.org/package/react-colorizer)
[![Dependency Status](https://david-dm.org/opensource-cards/react-colorizer.svg)](https://david-dm.org/opensource-cards/react-colorizer)
[![devDependency Status](https://david-dm.org/opensource-cards/react-colorizer/dev-status.svg)](https://david-dm.org/opensource-cards/react-colorizer#info=devDependencies)
[![peerDependency Status](https://david-dm.org/opensource-cards/react-colorizer/peer-status.svg)](https://david-dm.org/opensource-cards/react-colorizer#info=peerDependencies)

A library for generation of harmonious color themes for React and React Native.

![](https://github.com/opensource-cards/react-colorizer/blob/master/demo.gif)

### Installation

```
yarn add react-colorizer
```

### The Gist

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from 'react-colorizer';
import { Color, HarmonyTypes } from 'color-harmony-generator';

const selectedScheme = HarmonyTypes.TRIAD;

function onColorChanged(color) {
  const fullScheme = color.fullScheme(selectedScheme);
}

ReactDOM.render(
  <ColorPicker
    height={50}
    color="#e56500"
    width={255}
    onColorChanged={onColorChanged}
  />,
  document.getElementById('Container')
);
```

### API

prop             | type                 | default value
-----------------|----------------------|--------------
`color`          | `string`             | '#ff0000'
`height`         | `number`             |
`width`          | `number`             |
`onColorChanged` | `func`               |

### Want to contribute?

Please see [CONTRIBUTING.md](CONTRIBUTING.md)

### License

MIT
