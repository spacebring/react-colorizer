import autobind from 'autobind-decorator';
import React from 'react';
import ReactDOM from 'react-dom';
import { ColorPickerComponent, HarmonyTypes, fullScheme } from 'color-harmony-generator';
import { Scroller, Orientation } from 'react-scrolling';

export class Example extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedColor: '#38ff40',
		};
	}

  @autobind
  onColorChangedCallback(selectedColor) {
		const selected = document.getElementById('SelectedColor');
		selected.style.backgroundColor = selectedColor;
		selected.innerText = selectedColor;
		// can be: TRIAD, TETRAD, MONOCHROMATIC, ANALOGOUS, SPLIT_COMPLEMENT
		const colors = fullScheme(selectedColor, HarmonyTypes.TRIAD);
		const container = document.getElementById('GeneratedColors');
		container.innerHTML = '';
		for (let i in colors) {
			const color = colors[i];
			const elem = document.createElement('div');
			elem.innerText = '#' + color;
			elem.style.backgroundColor = '#' + color;
			container.appendChild(elem);
		}
	}

	componentDidMount() {
		this.onColorChangedCallback(this.state.selectedColor);
	}

  render() {
    return (
      <Scroller id="cp" orientation={Orientation.Horizontal} size={{container: 500}}>
				<h1>Color picker example</h1>
				<div id="ColorPickerContainer">
					<ColorPickerComponent
						height={50}
						selectedColor={this.state.selectedColor}
						onColorChangedCallback={this.onColorChangedCallback}
					/>
				</div>
				<div>
					<div id="SelectedLabel">Selected:</div>
					<div id="SelectedColor"></div>
				</div>
				<div id="GeneratedColors"></div>
			</Scroller>
    );
  }
}

ReactDOM.render(
	<Example/>,
	document.getElementById('ColorHarmonyGeneratorMainExample')
);
