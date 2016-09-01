# color-harmony-generator

[![npm package](https://badge.fury.io/js/color-harmony-generator.svg)](https://www.npmjs.org/package/color-harmony-generator)
[![Dependency Status](https://david-dm.org/opensource-cards/color-harmony-generator.svg)](https://david-dm.org/opensource-cards/color-harmony-generator)
[![devDependency Status](https://david-dm.org/opensource-cards/color-harmony-generator/dev-status.svg)](https://david-dm.org/opensource-cards/color-harmony-generator#info=devDependencies)

Library for generation of harmonious color themes. Include react components for picking colors.

### Installation

Using [npm](https://www.npmjs.com/):

```
npm install --save color-harmony-generator
```

### The Gist

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ColorPickerComponent, Color, HarmonyTypes } from 'color-harmony-generator';

const selectedScheme = HarmonyTypes.TRIAD;

function onColorChangedCallback(selectedColor) {
  const fullScheme = selectedColor.fullScheme(selectedScheme);
}

ReactDOM.render(
  <ColorPickerComponent
    height={50}
    onColorChangedCallback={onColorChangedCallback}
  />,
  document.getElementById('Container')
);
```

### Examples

* Main ([source](https://github.com/opensource-cards/color-harmony-generator/tree/master/examples/main))

### API

prop             | type                 | default value
-----------------|----------------------|--------------
`height`         | `number`             |
`selectedColor`  | `string`             | '#ff0000'
`onColorChanged` | `func`               |

### Web site

http://opensource-cards.github.io/color-harmony-generator

### License

MIT
