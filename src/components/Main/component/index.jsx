import PropTypes from "prop-types";
import React from "react";
import ColorPickerWrapper from "../components-styled/ColorPickerWrapper";
import { getHSLObject } from "../utils/color-converter";
import BarHue from "../../BarHue";
import BarLightness from "../../BarLightness";
import BarSaturation from "../../BarSaturation";

const propTypes = {
  color: PropTypes.string,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onColorChanged: PropTypes.func
};

const defaultProps = {
  color: "hsl(0, 100%, 50%)",
  onColorChanged: undefined
};

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.cache = {
      colorInput: props.color,
      colorParsed: getHSLObject(props.color)
    };
    this.onHueChanged = this.onHueChanged.bind(this);
    this.onSaturationChanged = this.onSaturationChanged.bind(this);
    this.onLightnessChange = this.onLightnessChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.color === this.cache.colorInput) {
      return;
    }
    this.setCachedColor(getHSLObject(nextProps.color));
  }

  onHueChanged(h) {
    this.setCachedColor({ ...this.cache.colorParsed, h });
    this.onColorChanged();
  }

  onSaturationChanged(s) {
    this.setCachedColor({ ...this.cache.colorParsed, s });
    this.onColorChanged();
  }

  onLightnessChange(l) {
    this.setCachedColor({ ...this.cache.colorParsed, l });
    this.onColorChanged();
  }

  onColorChanged() {
    const { onColorChanged } = this.props;
    if (onColorChanged) {
      onColorChanged(this.cache.colorInput);
    }
  }

  setCachedColor(newColorParsed) {
    this.cache = {
      ...this.cache,
      colorInput: `hsl(${Math.round(newColorParsed.h)}, ${Math.round(
        newColorParsed.s
      )}%, ${Math.round(newColorParsed.l)}%)`,
      colorParsed: newColorParsed
    };
  }

  render() {
    const { colorParsed } = this.cache;
    const { height, width } = this.props;
    return (
      <ColorPickerWrapper>
        <BarHue
          height={height}
          value={colorParsed.h}
          width={width}
          onValueChanged={this.onHueChanged}
        />
        <BarSaturation
          height={height}
          hue={colorParsed.h}
          value={colorParsed.s}
          width={width}
          onValueChanged={this.onSaturationChanged}
        />
        <BarLightness
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

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;
