import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ColorPickerComponent } from "../src/ts/components/ColorPickerComponent";

// can be: triad, tetrad, monochromatic, analogous, splitcomplement
var selectedScheme = 'triad';

var onColorChanged = function (c: any) {
	var selected = document.getElementById('SelectedColor');
	selected.style.backgroundColor = '#' + c.toHex();
	selected.innerText = '#' + c.toHex();

	var colors = c.fullScheme(selectedScheme);
	var container = document.getElementById('GeneratedColors');
	container.innerHTML = '';

	for (var i in colors) {
		var color = colors[i];
		var elem = document.createElement('div');
		elem.innerText = '#' + color;
		elem.style.backgroundColor = '#' + color;
		container.appendChild(elem);
	}
};

ReactDOM.render(
	<ColorPickerComponent
		height={50}
		onColorChanged={onColorChanged}
	/>,
	document.getElementById('ColorPickerContainer')
);