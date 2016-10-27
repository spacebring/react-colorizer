import React from 'react';
import tinycolor from 'tinycolor2';
import ColorPickerWrapper from '../components-styled/ColorPickerWrapper';
import HuePicker from '../../HuePicker';
import SaturationPicker from '../../SaturationPicker';
import LightnessPicker from '../../LightnessPicker';

const propTypes = {
  color: React.PropTypes.string,
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  onColorChanged: React.PropTypes.func,
};

const defaultProps = {
  color: '#ff0000',
};

export default class ColorPicker extends React.Component {

  constructor(props) {
    super(props);
    const inputTinycolor = tinycolor(props.color);
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
    this.onHueChanged = this.onHueChanged.bind(this);
    this.onSaturationChanged = this.onSaturationChanged.bind(this);
    this.onLightnessChange = this.onLightnessChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.color === this.cache.colorInput) {
      return;
    }
    const inputColorAny = tinycolor(nextProps.color).toHsl();
    this.setCachedColor({
      hue: inputColorAny.h,
      saturation: inputColorAny.s,
      lightness: inputColorAny.l,
    });
  }

  onHueChanged(hue) {
    const newColor = Object.assign({}, this.cache.colorParsed, {
      hue,
    });
    this.setCachedColor(newColor);
    this.onColorChanged();
  }

  onSaturationChanged(saturation) {
    const newColor = Object.assign({}, this.cache.colorParsed, {
      saturation,
    });
    this.setCachedColor(newColor);
    this.onColorChanged();
  }

  onLightnessChange(lightness) {
    const newColor = Object.assign({}, this.cache.colorParsed, {
      lightness,
    });
    this.setCachedColor(newColor);
    this.onColorChanged();
  }

  onColorChanged() {
    const { onColorChanged } = this.props;
    if (onColorChanged) {
      onColorChanged(this.cache.colorInput);
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
    const { height, width } = this.props;
    return (
      <ColorPickerWrapper>
        <HuePicker
          height={height}
          value={colorParsed.hue}
          width={width}
          onValueChanged={this.onHueChanged}
        />
        <SaturationPicker
          height={height}
          hue={colorParsed.hue}
          value={colorParsed.saturation}
          width={width}
          onValueChanged={this.onSaturationChanged}
        />
        <LightnessPicker
          height={height}
          hue={colorParsed.hue}
          saturation={colorParsed.saturation}
          value={colorParsed.lightness}
          width={width}
          onValueChanged={this.onLightnessChange}
        />
      </ColorPickerWrapper>
    );
  }
}

ColorPicker.propTypes = propTypes;
ColorPicker.defaultProps = defaultProps;
