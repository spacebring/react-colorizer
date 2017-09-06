import PropTypes from "prop-types";
import React from "react";
import {
  LinearGradient,
  Shape,
  Surface
} from "react-native/Libraries/ART/ReactNativeART";
import BarWrapper from "../../../BarWrapper";

const propTypes = {
  height: PropTypes.number.isRequired,
  hue: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  saturationPercent: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onValueChanged: PropTypes.func.isRequired
};

const defaultProps = {};

export default class LightnessPickerWrapper extends React.PureComponent {
  render() {
    const {
      height,
      hue,
      position,
      saturationPercent,
      width,
      onValueChanged
    } = this.props;
    return (
      <BarWrapper
        height={height}
        position={position}
        width={width}
        onValueChanged={onValueChanged}
      >
        <Surface height={height} width={width}>
          <Shape
            d={`M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`}
            fill={
              new LinearGradient(
                [
                  `hsl(${hue}, ${saturationPercent}%, 100%) 0%`,
                  `hsl(${hue}, ${saturationPercent}%, 50%) 50%`,
                  `hsl(${hue}, ${saturationPercent}%, 0%) 100%`
                ],
                0,
                0,
                width,
                0
              )
            }
          />
        </Surface>
      </BarWrapper>
    );
  }
}

LightnessPickerWrapper.propTypes = propTypes;
LightnessPickerWrapper.defaultProps = defaultProps;
