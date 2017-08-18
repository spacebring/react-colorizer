import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ColorPicker from '../../lib';
import fullScheme, { HarmonyTypes } from 'color-harmony-generator';

const { width } = Dimensions.get('window');

const COLORIZER_WIDTH = 800;
const COLORIZER_HEIGHT = 50;

class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color: 'hsl(26, 100%, 44%)',
      harmony: HarmonyTypes.TRIAD,
    };
    this.onColorChanged = this.onColorChanged.bind(this);
    this.onHarmonyChange = this.onHarmonyChange.bind(this);
    this.onSetRandomColor = this.onSetRandomColor.bind(this);
  }

  onColorChanged(color) {
    this.setState(() => ({
      color,
    }));
  }

  onHarmonyChange(e) {
    this.setState(() => ({
      harmony: e.target.value,
    }));
  }

  onSetRandomColor() {
    const randomColor = `#${('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6)}`;
    this.onColorChanged(randomColor);
  }

  render() {
    const colors = fullScheme(this.state.color, this.state.harmony);
    // style={{ transform: 'scale3d(0.5, 0.5, 1)' }}
    return (
      <View>
        <ColorPicker
          height={COLORIZER_HEIGHT}
          color={this.state.color}
          width={COLORIZER_WIDTH}
          onColorChanged={this.onColorChanged}
        />
        <View>
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: COLORIZER_WIDTH,
            fontFamily: 'Roboto, Helvetica, Trebuchet MS, sans-serif',
            fontWeight: 100,
          }}
        >
          <View style={{ marginBottom: 10, marginTop: 20 }} ><Text>Selected color:</Text></View>
          <TouchableOpacity style={{ marginBottom: 10, marginTop: 20 }} onPress={this.onSetRandomColor}>
            <Text>Set random color</Text>
          </TouchableOpacity>
        </View>
        <View
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
          <Text>{this.state.color}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: COLORIZER_WIDTH,
            fontFamily: 'Roboto, Helvetica, Trebuchet MS, sans-serif',
            fontWeight: 100,
          }}
        >
          <View style={{ marginBottom: 10, marginTop: 20 }} ><Text>Generated colors:</Text></View>
          {/*<select
            value={this.state.harmony}
            onChange={this.onHarmonyChange}
            style={{ marginBottom: 10, marginTop: 20 }}
          >
            {Object.keys(HarmonyTypes).map(harmonyType => (
              <option key={harmonyType} value={HarmonyTypes[harmonyType]}>
                {HarmonyTypes[harmonyType]}
              </option>
            ))}
          </select>*/}
        </View>
        <View
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
            <View
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
              <Text>{color}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

storiesOf('examples', module)
  .add('main', () => (
<<<<<<< HEAD
    <Example />
=======
    <View>
      <View style={{ backgroundColor: '#EDEBE6', height: 50 }} />
      <ColorPicker
        height={50}
        color="#e56500"
        width={width}
        onColorChanged={action()}
      />
      <View style={{ backgroundColor: '#EDEBE6', height: 50 }} />
    </View>
>>>>>>> 2519264d88c806000c076b515625a2840df58f8d
  ));
