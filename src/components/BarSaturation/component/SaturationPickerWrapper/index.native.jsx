import PropTypes from "prop-types";
import React from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "svgs";
import BarWrapper from "../../../BarWrapper";

const propTypes = {
  height: PropTypes.number.isRequired,
  hue: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  onValueChangeEnd: PropTypes.func,
  onValueChangeStart: PropTypes.func
};

const defaultProps = {};

export default class SaturationPickerWrapper extends React.PureComponent {
  render() {
    const {
      height,
      hue,
      isDisabled,
      position,
      width,
      onValueChanged,
      onValueChangeEnd,
      onValueChangeStart
    } = this.props;
    const hueRounded = Math.round(hue);
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
              id="BarPickerGradient"
              x1="0"
              y1="0"
              x2={width}
              y2="0"
            >
              <Stop
                offset="0"
                stopColor={`hsl(${hueRounded}, 0%, 50%)`}
                stopOpacity="1"
              />
              <Stop
                offset="1"
                stopColor={`hsl(${hueRounded}, 100%, 50%)`}
                stopOpacity="1"
              />
            </LinearGradient>
          </Defs>
          <Path
            d={`M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`}
            fill="url(#BarPickerGradient)"
          />
        </Svg>
      </BarWrapper>
    );
  }
}

SaturationPickerWrapper.propTypes = propTypes;
SaturationPickerWrapper.defaultProps = defaultProps;
