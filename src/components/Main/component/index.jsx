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
  isDisabled: PropTypes.bool,
  width: PropTypes.number.isRequired,
  onColorChanged: PropTypes.func,
  onColorChangeEnd: PropTypes.func,
  onColorChangeStart: PropTypes.func
};

const defaultProps = {
  color: "hsl(38.2, 21.57%, 90%)",
  isDisabled: false,
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
    const {
      height,
      isDisabled,
      width,
      onColorChangeEnd,
      onColorChangeStart
    } = this.props;
    return (
      <ColorPickerWrapper>
        <BarHue
          height={height}
          isDisabled={isDisabled}
          value={colorParsed.h}
          width={width}
          onValueChanged={this.onHueChanged}
          onValueChangeEnd={onColorChangeEnd}
          onValueChangeStart={onColorChangeStart}
        />
        <BarSaturation
          height={height}
          hue={colorParsed.h}
          isDisabled={isDisabled}
          value={colorParsed.s}
          width={width}
          onValueChanged={this.onSaturationChanged}
          onValueChangeEnd={onColorChangeEnd}
          onValueChangeStart={onColorChangeStart}
        />
        <BarLightness
          height={height}
          hue={colorParsed.h}
          isDisabled={isDisabled}
          saturation={colorParsed.s}
          value={colorParsed.l}
          width={width}
          onValueChanged={this.onLightnessChange}
          onValueChangeEnd={onColorChangeEnd}
          onValueChangeStart={onColorChangeStart}
        />
      </ColorPickerWrapper>
    );
  }
}

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;
