import autobind from 'autobind-decorator';
import React from 'react';
import tinycolor from 'tinycolor2';
import HuePicker from './HuePicker';
import SaturationPicker from './SaturationPicker';
import LightnessPicker from './LightnessPicker';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  selectedColor: React.PropTypes.string,
  onColorChangedCallback: React.PropTypes.func,
};

const defaultProps = {
  selectedColor: '#ff0000',
};

export default class ColorPickerComponent extends React.Component {

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
    this.onColorChangedCallback();
  }

  @autobind
  onSaturationChanged(saturation) {
    const newColor = Object.assign({}, this.cache.colorParsed, {
      saturation,
    });
    this.setCachedColor(newColor);
    this.onColorChangedCallback();
  }

  @autobind
  onLightnessChange(lightness) {
    const newColor = Object.assign({}, this.cache.colorParsed, {
      lightness,
    });
    this.setCachedColor(newColor);
    this.onColorChangedCallback();
  }

  onColorChangedCallback() {
    const { onColorChangedCallback } = this.props;
    if (onColorChangedCallback) {
      onColorChangedCallback(this.cache.colorInput);
    }
  }

  setCachedColor(newColorParsed) {
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
  }

  render() {
    const { colorParsed } = this.cache;
    return (
      <div>
        <HuePicker
          height={this.props.height}
          value={colorParsed.hue}
          onValueChanged={this.onHueChanged}
        />
        <SaturationPicker
          height={this.props.height}
          hue={colorParsed.hue}
          value={colorParsed.saturation}
          onValueChanged={this.onSaturationChanged}
        />
        <LightnessPicker
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
