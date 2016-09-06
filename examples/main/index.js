import React from 'react';
import ReactDOM from 'react-dom';
import { ColorPicker, HarmonyTypes, fullScheme } from 'react-colorizer';
import { Scroller, Orientation } from 'react-scrolling';

class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color: '#e56500',
      cpVisible: false,
    };
    this.onColorChanged = this.onColorChanged.bind(this);
    this.setRandom = this.setRandom.bind(this);
    this.showColorPicker = this.showColorPicker.bind(this);
  }

  onColorChanged(color) {
    this.setState({ color });
    const selected = document.getElementById('SelectedColor');
    selected.style.backgroundColor = color;
    selected.innerText = color;
    // can be: TRIAD, TETRAD, MONOCHROMATIC, ANALOGOUS, SPLIT_COMPLEMENT
    const colors = fullScheme(color, HarmonyTypes.TRIAD);
    const container = document.getElementById('GeneratedColors');
    container.innerHTML = '';
    for (let i in colors) {
      const elem = document.createElement('div');
      elem.innerText = colors[i];
      elem.style.backgroundColor = colors[i];
      container.appendChild(elem);
    }
  }

  componentDidMount() {
    this.onColorChanged(this.state.color);
  }

  setRandom() {
    const newColor = '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
    this.onColorChanged(newColor);
  }

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
        <ColorPicker
          height={50}
          color={this.state.color}
          onColorChanged={this.onColorChanged}
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
  document.getElementById('Container')
);
