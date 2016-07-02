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
			cpVisible: false,
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
	
	@autobind
	setRandom() {
		const newColor = '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
		this.setState({
			selectedColor: newColor,
		});
	}
	
	@autobind
	showColorPicker() {
		this.setState({
			cpVisible: true,
		});
	}

  render() {
    return (
      <Scroller id="cp" orientation={Orientation.Horizontal} size={{container: 500}}>
		<h1>Color picker example</h1>
		<button onClick={this.showColorPicker}>Show color picker</button>
		<div id="ColorPickerContainer">
			{this.state.cpVisible ? (
				<ColorPickerComponent
					height={50}
					selectedColor={this.state.selectedColor}
					onColorChangedCallback={this.onColorChangedCallback}
				/>
			) : undefined}
		</div>
		<div>
			<button onClick={this.setRandom}>Set Random</button>
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
