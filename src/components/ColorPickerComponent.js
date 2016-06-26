import autobind from 'autobind-decorator';
import React from 'react';
import tinycolor from 'tinycolor2';
import {
  toHex,
  getColorByPosition,
  getColorFromBaseAndBrightness,
  getBasePositionFromRGB,
  getBrightnessFromRGB,
} from '../utils/color';
import { BaseColorPickerComponent } from './BaseColorPickerComponent';
import { BrightnessPickerComponent } from './BrightnessPickerComponent';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  selectedColor: React.PropTypes.string,
  onColorChangedCallback: React.PropTypes.func,
};

const defaultProps = {
  selectedColor: '#ff0000',
};

export class ColorPickerComponent extends React.Component {

  // TODO: calcualte baseColorPosition
  constructor(props) {
    super(props);
    const baseColor = tinycolor(props.selectedColor).toRgb();
    const brightness = getBrightnessFromRGB(baseColor);
    const basePos = getBasePositionFromRGB(baseColor);
    this.state = {
      baseColor,
      baseColorPosition: basePos,
      brightnessPosition: brightness,
    };
  }

  @autobind
  onBaseColorChange(baseColorPosition) {
    const baseColor = getColorByPosition(baseColorPosition);
    const newMainColor = this.getSelectedColor(this.state.brightnessPosition);
    this.setState({
      baseColor,
      baseColorPosition,
    });
    this.props.onColorChangedCallback(newMainColor);
  }

  @autobind
  onBrightnessPickerColorChange(brightnessPosition) {
    const newMainColor = this.getSelectedColor(brightnessPosition);
    this.setState({
      brightnessPosition,
    });
    this.props.onColorChangedCallback(newMainColor);
  }

  @autobind
  getSelectedColor(brightnessPosition) {
    const baseColor = this.state.baseColor;
    const newMainColor = getColorFromBaseAndBrightness(baseColor, brightnessPosition);
    return `#${tinycolor(newMainColor).toHex()}`;
  }

  render() {
    return (
      <div>
        <BaseColorPickerComponent
          height={this.props.height}
          position={this.state.baseColorPosition}
          onBaseColorChanged={this.onBaseColorChange}
        />
        <BrightnessPickerComponent
          height={this.props.height}
          color={toHex(this.state.baseColor)}
          position={this.state.brightnessPosition}
          onPositionChanged={this.onBrightnessPickerColorChange}
        />
      </div>
    );
  }
}

ColorPickerComponent.propTypes = propTypes;
ColorPickerComponent.defaultProps = defaultProps;
