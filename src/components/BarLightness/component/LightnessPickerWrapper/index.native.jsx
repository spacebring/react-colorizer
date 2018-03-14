import PropTypes from "prop-types";
import React from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "svgs";
import BarWrapper from "../../../BarWrapper";

const propTypes = {
  height: PropTypes.number.isRequired,
  hue: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
  saturationPercent: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  onValueChangeEnd: PropTypes.func,
  onValueChangeStart: PropTypes.func
};

const defaultProps = {};

export default class LightnessPickerWrapper extends React.PureComponent {
  render() {
    const {
      height,
      hue,
      isDisabled,
      position,
      saturationPercent,
      width,
      onValueChanged,
      onValueChangeEnd,
      onValueChangeStart
    } = this.props;
    const hueRounded = Math.round(hue);
    const saturationPercentRounded = Math.round(saturationPercent);
    return (
      <BarWrapper
        height={height}
        isDisabled={isDisabled}
        position={position}
        width={width}
        onValueChanged={onValueChanged}
        onValueChangeEnd={onValueChangeEnd}
        onValueChangeStart={onValueChangeStart}
      >
        <Svg height={height} width={width}>
          <Defs>
            <LinearGradient
              id="LightnessPickerGradient"
              x1="0"
              y1="0"
              x2={width}
              y2="0"
            >
              <Stop
                offset="0"
                stopColor={`hsl(${hueRounded}, ${saturationPercentRounded}%, 100%)`}
                stopOpacity="1"
              />
              <Stop
                offset="0.5"
                stopColor={`hsl(${hueRounded}, ${saturationPercentRounded}%, 50%)`}
                stopOpacity="1"
              />
              <Stop
                offset="1"
                stopColor={`hsl(${hueRounded}, ${saturationPercentRounded}%, 0%)`}
                stopOpacity="1"
              />
            </LinearGradient>
          </Defs>
          <Path
            d={`M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`}
            fill="url(#LightnessPickerGradient)"
          />
        </Svg>
      </BarWrapper>
    );
  }
}

LightnessPickerWrapper.propTypes = propTypes;
LightnessPickerWrapper.defaultProps = defaultProps;
