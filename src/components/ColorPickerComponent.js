import autobind from 'autobind-decorator';
import React from 'react';
import tinycolor from 'tinycolor2';
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
    const inputTinycolor = tinycolor(props.selectedColor);
    const inputColorAny = inputTinycolor.toHsl();
    const inputColorHEX = `#${inputTinycolor.toHex()}`;
    this.cache = {
      colorInput: inputColorHEX,
      colorParsed: {
        hue: inputColorAny.h,
        saturation: inputColorAny.s,
        lightness: inputColorAny.l,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedColor === this.cache.colorInput) {
      return;
    }
    const inputColorAny = tinycolor(nextProps.selectedColor).toHsl();
    this.setCachedColor({
      hue: inputColorAny.h,
      saturation: inputColorAny.s,
      lightness: inputColorAny.l,
    });
  }

  @autobind
  onHueChanged(hue) {
    const newColor = Object.assign({}, this.cache.colorParsed, {
      hue,
    });
    this.setCachedColor(newColor);
  }

  @autobind
  onSaturationChanged(saturation) {
    const newColor = Object.assign({}, this.cache.colorParsed, {
      saturation,
    });
    this.setCachedColor(newColor);
  }

  @autobind
  onLightnessChange(lightness) {
    const newColor = Object.assign({}, this.cache.colorParsed, {
      lightness,
    });
    this.setCachedColor(newColor);
  }

  setCachedColor(newColorParsed) {
    const { onColorChangedCallback } = this.props;
    const newColorHSL = {
      h: newColorParsed.hue,
      s: newColorParsed.saturation,
      l: newColorParsed.lightness,
    };
    const newColorHEX = `#${tinycolor(newColorHSL).toHex()}`;
    this.cache = Object.assign({}, this.cache, {
      colorInput: newColorHEX,
      colorParsed: newColorParsed,
    });
    if (onColorChangedCallback) {
      onColorChangedCallback(newColorHEX);
    }
  }

  render() {
    const { colorParsed } = this.cache;
    return (
      <div>
        <HuePickerComponent
          height={this.props.height}
          value={colorParsed.hue}
          onValueChanged={this.onHueChanged}
        />
        <SaturationPickerComponent
          height={this.props.height}
          hue={colorParsed.hue}
          value={colorParsed.saturation}
          onValueChanged={this.onSaturationChanged}
        />
        <LightnessPickerComponent
          height={this.props.height}
          hue={colorParsed.hue}
          saturation={colorParsed.saturation}
          value={colorParsed.lightness}
          onValueChanged={this.onLightnessChange}
        />
      </div>
    );
  }
}

ColorPickerComponent.propTypes = propTypes;
ColorPickerComponent.defaultProps = defaultProps;
