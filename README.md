# color-harmony-generator

Library for generation of harmonious color themes. Include react components for picking colors.

### Installation

Using [npm](https://www.npmjs.com/):

```
npm install --save color-harmony-generator
```

### The Gist

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
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

### Web site

http://opensource-cards.github.io/color-harmony-generator

### License

MIT
