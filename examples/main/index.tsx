import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ColorPickerComponent } from '../../src/ts/components/ColorPickerComponent';
import { Color } from '../../src/ts/color';

// can be: triad, tetrad, monochromatic, analogous, splitcomplement
var selectedScheme = 'triad';

var onColorChangedCallback = function (mainColor: Color) {
	var selected = document.getElementById('SelectedColor');
	selected.style.backgroundColor = '#' + mainColor.toHex();
	selected.innerText = '#' + mainColor.toHex();

	var colors = mainColor.fullScheme(selectedScheme);
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
		onColorChangedCallback={onColorChangedCallback}
	/>,
	document.getElementById('ColorPickerContainer')
);