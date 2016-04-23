import * as React from 'react';
import autobind from 'autobind-decorator';
import { Color } from '../utils/color';
import { BaseColorPickerComponent } from './BaseColorPickerComponent';
import { BrightnessPickerComponent } from './BrightnessPickerComponent';

export class ColorPickerComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      baseColor: props.defaultColor,
      color: props.defaultColor,
      brightnessPosition: 0.5,
    };
  }

  @autobind
  onBrightnessPickerColorChanged(position) {
    const
      newMainColor = this.getMainColor(position);

    this.setState({
      brightnessPosition: position,
      color: newMainColor,
    });

    this.changeColor(newMainColor);
  }

  @autobind
  setBrightnessPickerBase(baseColor) {
    const
      newMainColor = this.getMainColor(this.state.brightnessPosition);

    this.setState({
      baseColor,
      color: newMainColor,
    });

    this.changeColor(newMainColor);
  }

  @autobind
  getMainColor(position) {
    const baseColor = this.state.baseColor;
    const newMainColor = new Color(0, 0, 0);

    if (position < 0.5) {
      newMainColor.r = 255 + (baseColor.r - 255) * (position * 2);
      newMainColor.g = 255 + (baseColor.g - 255) * (position * 2);
      newMainColor.b = 255 + (baseColor.b - 255) * (position * 2);
    } else {
      newMainColor.r = baseColor.r - baseColor.r * ((position - 0.5) * 2);
      newMainColor.g = baseColor.g - baseColor.g * ((position - 0.5) * 2);
      newMainColor.b = baseColor.b - baseColor.b * ((position - 0.5) * 2);
    }

    return newMainColor;
  }

  @autobind
  changeColor() {
    this.props.onColorChangedCallback(this.state.color);
  }

  render() {
    return (
      <div>
        <BaseColorPickerComponent
          height={this.props.height}
          color={this.state.baseColor}
          onBaseColorChanged={this.setBrightnessPickerBase}
        />
        <BrightnessPickerComponent
          height={this.props.height}
          color={this.state.baseColor}
          position={this.state.brightnessPosition}
          onPositionChanged={this.onBrightnessPickerColorChanged}
        />
      </div>
    );
  }
}

ColorPickerComponent.defaultProps = {
  height: undefined,
  defaultColor: new Color(255, 0, 0),
  onColorChangedCallback: undefined,
};

ColorPickerComponent.propTypes = {
  height: React.PropTypes.any.isRequired,
  defaultColor: React.PropTypes.any,
  onColorChangedCallback: React.PropTypes.any,
};
