import autobind from 'autobind-decorator';
import React from 'react';
import tinycolor from 'tinycolor2';
import {
  toHex,
  getColorByPosition,
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
    this.state = {
      baseColor,
      baseColorPosition: 0.5,
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
    const newMainColor = {};
    if (brightnessPosition < 0.5) {
      newMainColor.r = 255 + (baseColor.r - 255) * (2 * brightnessPosition);
      newMainColor.g = 255 + (baseColor.g - 255) * (2 * brightnessPosition);
      newMainColor.b = 255 + (baseColor.b - 255) * (2 * brightnessPosition);
    } else {
      newMainColor.r = baseColor.r - baseColor.r * (2 * brightnessPosition - 1);
      newMainColor.g = baseColor.g - baseColor.g * (2 * brightnessPosition - 1);
      newMainColor.b = baseColor.b - baseColor.b * (2 * brightnessPosition - 1);
    }
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
