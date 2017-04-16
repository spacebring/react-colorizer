import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ColorPicker, { HarmonyTypes, fullScheme } from 'react-colorizer';

const COLORIZER_WIDTH = 510;
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
    const randomColor = `#${('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6)}`;
    this.onColorChanged(randomColor);
  }

  render() {
    const colors = fullScheme(this.state.color, this.state.harmony);
    return (
      <div style={{ transform: 'scale3d(0.5, 0.5, 1)' }} >
        <ColorPicker
          height={COLORIZER_HEIGHT}
          color={this.state.color}
          width={COLORIZER_WIDTH}
          onColorChanged={this.onColorChanged}
        />
        <br />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: COLORIZER_WIDTH,
            fontFamily: 'Roboto, Helvetica, Trebuchet MS, sans-serif',
            fontWeight: 100,
          }}
        >
          <div style={{ marginBottom: 10, marginTop: 20 }} >Selected color:</div>
          <button style={{ marginBottom: 10, marginTop: 20 }} onClick={this.onSetRandomColor}>
            Set random color
          </button>
        </div>
        <div
          style={{
            backgroundColor: this.state.color,
            width: COLORIZER_WIDTH,
            height: 40,
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'monospace',
            fontWeight: 200,
          }}
        >
          {this.state.color}
        </div>
        <br />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: COLORIZER_WIDTH,
            fontFamily: 'Roboto, Helvetica, Trebuchet MS, sans-serif',
            fontWeight: 100,
          }}
        >
          <div style={{ marginBottom: 10, marginTop: 20 }} >Generated colors:</div>
          <select
            value={this.state.harmony}
            onChange={this.onHarmonyChange}
            style={{ marginBottom: 10, marginTop: 20 }}
          >
            {Object.keys(HarmonyTypes).map(harmonyType => (
              <option key={harmonyType} value={HarmonyTypes[harmonyType]}>
                {HarmonyTypes[harmonyType]}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'flex-start',
            width: COLORIZER_WIDTH,
            fontFamily: 'monospace',
            fontWeight: 200,
          }}
        >
          {colors.map((color, index) => (
            <div
              key={index}
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: color,
                height: 40,
                width: '20%',
              }}
            >
              {color}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

storiesOf('examples', module)
  .add('main', () => (
    <Example />
  ));
