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
  onColorChanged: undefined,
};

export default class ColorPicker extends React.Component {

  constructor(props) {
    super(props);
    const inputTinycolor = tinycolor(props.color);
    this.cache = {
      colorInput: `#${inputTinycolor.toHex()}`,
      colorParsed: inputTinycolor.toHsl(),
    };
    this.onHueChanged = this.onHueChanged.bind(this);
    this.onSaturationChanged = this.onSaturationChanged.bind(this);
    this.onLightnessChange = this.onLightnessChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.color === this.cache.colorInput) {
      return;
    }
    this.setCachedColor(tinycolor(nextProps.color).toHsl());
  }

  onHueChanged(h) {
    this.setCachedColor(Object.assign({}, this.cache.colorParsed, { h }));
    this.onColorChanged();
  }

  onSaturationChanged(s) {
    this.setCachedColor(Object.assign({}, this.cache.colorParsed, { s }));
    this.onColorChanged();
  }

  onLightnessChange(l) {
    this.setCachedColor(Object.assign({}, this.cache.colorParsed, { l }));
    this.onColorChanged();
  }

  onColorChanged() {
    const { onColorChanged } = this.props;
    if (onColorChanged) {
      onColorChanged(this.cache.colorInput);
    }
  }

  setCachedColor(newColorParsed) {
    this.cache = Object.assign({}, this.cache, {
      colorInput: `#${tinycolor(newColorParsed).toHex()}`,
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
          value={colorParsed.h}
          width={width}
          onValueChanged={this.onHueChanged}
        />
        <SaturationPicker
          height={height}
          hue={colorParsed.h}
          value={colorParsed.s}
          width={width}
          onValueChanged={this.onSaturationChanged}
        />
        <LightnessPicker
          height={height}
          hue={colorParsed.h}
          saturation={colorParsed.s}
          value={colorParsed.l}
          width={width}
          onValueChanged={this.onLightnessChange}
        />
      </ColorPickerWrapper>
    );
  }
}

ColorPicker.propTypes = propTypes;
ColorPicker.defaultProps = defaultProps;
