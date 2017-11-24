import PropTypes from "prop-types";
import React from "react";
import Svg, { Defs, LinearGradient, Path, Stop } from "svgs";
import BarWrapper from "../../../BarWrapper";

const propTypes = {
  height: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  onValueChangeEnd: PropTypes.func,
  onValueChangeStart: PropTypes.func
};

const defaultProps = {};

export default class HuePickerWrapper extends React.PureComponent {
  render() {
    const {
      height,
      position,
      width,
      onValueChanged,
      onValueChangeEnd,
      onValueChangeStart
    } = this.props;
    return (
      <BarWrapper
        height={height}
        position={position}
        renderToHardwareTextureAndroid
        width={width}
        onValueChanged={onValueChanged}
        onValueChangeEnd={onValueChangeEnd}
        onValueChangeStart={onValueChangeStart}
      >
        <Svg height={height} width={width}>
          <Defs>
            <LinearGradient
              id="HuePickerGradient"
              x1="0"
              y1="0"
              x2={width}
              y2="0"
            >
              <Stop offset="0" stopColor="hsl(0, 100%, 50%)" stopOpacity="1" />
              <Stop
                offset="0.17"
                stopColor="hsl(60, 100%, 50%)"
                stopOpacity="1"
              />
              <Stop
                offset="0.33"
                stopColor="hsl(120, 100%, 50%)"
                stopOpacity="1"
              />
              <Stop
                offset="0.50"
                stopColor="hsl(180, 100%, 50%)"
                stopOpacity="1"
              />
              <Stop
                offset="0.67"
                stopColor="hsl(240, 100%, 50%)"
                stopOpacity="1"
              />
              <Stop
                offset="0.83"
                stopColor="hsl(300, 100%, 50%)"
                stopOpacity="1"
              />
              <Stop
                offset="1"
                stopColor="hsl(360, 100%, 50%)"
                stopOpacity="1"
              />
            </LinearGradient>
          </Defs>
          <Path
            d={`M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`}
            fill="url(#HuePickerGradient)"
          />
        </Svg>
      </BarWrapper>
    );
  }
}

HuePickerWrapper.propTypes = propTypes;
HuePickerWrapper.defaultProps = defaultProps;
