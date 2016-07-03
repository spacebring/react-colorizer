import autobind from 'autobind-decorator';
import React from 'react';
import tinycolor from 'tinycolor2';
import { ColorPickerCircleComponent } from './ColorPickerCircleComponent';
import { HuePickerComponent } from './HuePickerComponent';
import { SaturationPickerComponent } from './SaturationPickerComponent';
import { LightnessPickerComponent } from './LightnessPickerComponent';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  selectedColor: React.PropTypes.string,
  onColorChangedCallback: React.PropTypes.func,
};

const defaultProps = {
  selectedColor: '#ff0000',
};

export class ColorPickerComponent extends React.Component {

  constructor(props) {
    super(props);
    const color = tinycolor(this.props.selectedColor).toHsl();
    this.state = {
      color: {
        hue: color.h,
        saturation: color.s,
        lightness: color.l,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedColor === undefined ||
      ColorPickerCircleComponent.dragging) {
      return;
    }
    this.setColor(nextProps.selectedColor);
  }

  @autobind
  onHueChanged(hue) {
    const newColor = Object.assign({}, this.state.color, {
      hue,
    });
    this.onColorChanged(newColor);
  }

  @autobind
  onSaturationChanged(saturation) {
    const newColor = Object.assign({}, this.state.color, {
      saturation,
    });
    this.onColorChanged(newColor);
  }

  @autobind
  onLightnessChange(lightness) {
    const newColor = Object.assign({}, this.state.color, {
      lightness,
    });
    this.onColorChanged(newColor);
  }

  onColorChanged(newColor) {
    this.setState({
      color: newColor,
    });
    const hslColor = {
      h: newColor.hue,
      s: newColor.saturation,
      l: newColor.lightness,
    };
    const hex = tinycolor(hslColor).toHex();
    if (this.props.onColorChangedCallback) {
      this.props.onColorChangedCallback(`#${hex}`);
    }
  }

  setColor(color) {
    const hslColor = tinycolor(color).toHsl();
    this.setState({
      color: {
        hue: hslColor.h,
        saturation: hslColor.s,
        lightness: hslColor.l,
      },
    });
  }

  render() {
    return (
      <div>
        <HuePickerComponent
          height={this.props.height}
          value={this.state.color.hue}
          onValueChanged={this.onHueChanged}
        />
        <SaturationPickerComponent
          height={this.props.height}
          hue={this.state.color.hue}
          value={this.state.color.saturation}
          onValueChanged={this.onSaturationChanged}
        />
        <LightnessPickerComponent
          height={this.props.height}
          hue={this.state.color.hue}
          saturation={this.state.color.saturation}
          value={this.state.color.lightness}
          onValueChanged={this.onLightnessChange}
        />
      </div>
    );
  }
}

ColorPickerComponent.propTypes = propTypes;
ColorPickerComponent.defaultProps = defaultProps;
