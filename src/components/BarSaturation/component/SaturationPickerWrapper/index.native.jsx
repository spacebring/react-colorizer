import PropTypes from "prop-types";
import React from "react";
import { ART } from "react-native";
import BarWrapper from "../../../BarWrapper";

const propTypes = {
  height: PropTypes.number.isRequired,
  hue: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onValueChanged: PropTypes.func.isRequired
};

const defaultProps = {};

export default class SaturationPickerWrapper extends React.PureComponent {
  render() {
    const { height, hue, position, width, onValueChanged } = this.props;
    return (
      <BarWrapper
        height={height}
        position={position}
        width={width}
        onValueChanged={onValueChanged}
      >
        <ART.Surface height={height} width={width}>
          <ART.Shape
            fill={
              new ART.LinearGradient(
                [`hsl(${hue}%, 0%, 50%) 0%`, `hsl(${hue}%, 100%, 50%) 100%`],
                0,
                0,
                width,
                0
              )
            }
            d={`M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`}
          />
        </ART.Surface>
      </BarWrapper>
    );
  }
}

SaturationPickerWrapper.propTypes = propTypes;
SaturationPickerWrapper.defaultProps = defaultProps;
