import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { ColorPicker, HarmonyTypes, fullScheme } from 'react-colorizer';

const COLORIZER_WIDTH = 255;
const COLORIZER_HEIGHT = 50;

class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color: '#e56500',
      harmony: HarmonyTypes.TRIAD,
    };
    this.onColorChanged = this.onColorChanged.bind(this);
    this.onHarmonyChange = this.onHarmonyChange.bind(this);
    this.onSetRandomColor = this.onSetRandomColor.bind(this);
  }

  onColorChanged(color) {
    this.setState({ color });
  }

  onHarmonyChange(e) {
    this.setState({ harmony: e.target.value });
  }

  onSetRandomColor() {
    const randomColor = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
    this.onColorChanged(randomColor);
  }

  render() {
    const colors = fullScheme(this.state.color, this.state.harmony);
    return (
      <div>
        <ColorPicker
          height={COLORIZER_HEIGHT}
          color={this.state.color}
          width={COLORIZER_WIDTH}
          onColorChanged={this.onColorChanged}
        />
        <br />
        <div>Selected color</div>
        <button onClick={this.onSetRandomColor}>Set random color</button>
        <div style={{ backgroundColor: this.state.color, width: COLORIZER_WIDTH }} >{this.state.color}</div>
        <br />
        <div>Harmony colors</div>
        <select
          value={this.state.harmony}
          onChange={this.onHarmonyChange} 
        >
          {Object.keys(HarmonyTypes).map(harmonyType => (
            <option key={harmonyType} value={HarmonyTypes[harmonyType]}>{HarmonyTypes[harmonyType]}</option>
          ))}
        </select>
        <div style={{ width: COLORIZER_WIDTH }} >
          {colors.map((color, index) => (
            <div key={index} style={{ backgroundColor: color }} >{color}</div>
          ))}
        </div>
      </div>
    );
  }
}

storiesOf('Examples', module)
  .add('main', () => (
    <Example />
  ));
