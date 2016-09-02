# react-colorizer

[![npm package](https://badge.fury.io/js/react-colorizer.svg)](https://www.npmjs.org/package/react-colorizer)
[![Dependency Status](https://david-dm.org/opensource-cards/react-colorizer.svg)](https://david-dm.org/opensource-cards/react-colorizer)
[![devDependency Status](https://david-dm.org/opensource-cards/react-colorizer/dev-status.svg)](https://david-dm.org/opensource-cards/react-colorizer#info=devDependencies)

Library for generation of harmonious color themes. Include react components for picking colors.

### Installation

Using [npm](https://www.npmjs.com/):

```
npm install --save react-colorizer
```

### The Gist

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ColorPicker, Color, HarmonyTypes } from 'react-colorizer';

const selectedScheme = HarmonyTypes.TRIAD;

function onColorChanged(color) {
  const fullScheme = color.fullScheme(selectedScheme);
}

ReactDOM.render(
  <ColorPicker height={50} onColorChanged={onColorChanged} />,
  document.getElementById('Container')
);
```

### Examples

* Main ([source](https://github.com/opensource-cards/react-colorizer/tree/master/examples/main))

### Web site

http://opensource-cards.github.io/react-colorizer

### License

MIT
