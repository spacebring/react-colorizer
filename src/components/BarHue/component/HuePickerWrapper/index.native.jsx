import PropTypes from "prop-types";
import React from "react";
import { ART } from "react-native";
import BarWrapper from "../../../BarWrapper";

const propTypes = {
  height: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onValueChanged: PropTypes.func.isRequired
};

const defaultProps = {};

export default class HuePickerWrapper extends React.PureComponent {
  render() {
    const { height, position, width, onValueChanged } = this.props;
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
                [
                  "hsl(0, 100%, 50%) 0%",
                  "hsl(60, 100%, 50%) 17%",
                  "hsl(120, 100%, 50%) 33%",
                  "hsl(180, 100%, 50%) 50%",
                  "hsl(240, 100%, 50%) 67%",
                  "hsl(300, 100%, 50%) 83%",
                  "hsl(360, 100%, 50%) 100%"
                ],
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

HuePickerWrapper.propTypes = propTypes;
HuePickerWrapper.defaultProps = defaultProps;
