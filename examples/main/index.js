import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ColorPickerComponent, Color, HarmonyTypes } from 'color-harmony-generator';
import { Scroller, Orientation } from 'react-scrolling';

// can be: TRIAD, TETRAD, MONOCHROMATIC, ANALOGOUS, SPLIT_COMPLEMENT
const
	selectedScheme = HarmonyTypes.TRIAD;

function onColorChangedCallback(mainColor) {
	const
		selected = document.getElementById('SelectedColor');
	selected.style.backgroundColor = '#' + mainColor.toHex();
	selected.innerText = '#' + mainColor.toHex();

	const
		colors = mainColor.fullScheme(selectedScheme),
		container = document.getElementById('GeneratedColors');
	container.innerHTML = '';

	for (let i in colors) {
		const
			color = colors[i],
			elem = document.createElement('div');

		elem.innerText = '#' + color;
		elem.style.backgroundColor = '#' + color;
		container.appendChild(elem);
	}
};

ReactDOM.render(
	<Scroller id="cp" orientation={Orientation.Horizontal} size={{container: 500}}>
		<h1>Color picker example</h1>
		<div id="ColorPickerContainer">
			<ColorPickerComponent
				height={50}
				onColorChangedCallback={onColorChangedCallback}
			/>
		</div>
		<div>
			<div id="SelectedLabel">Selected:</div>
			<div id="SelectedColor"></div>
		</div>
		<div id="GeneratedColors"></div>
	</Scroller>,
	document.getElementById('ColorHarmonyGeneratorMainExample')
);
