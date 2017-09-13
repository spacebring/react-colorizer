import PropTypes from "prop-types";
import React from "react";
import ColorPickerCircleWrapper from "../components-styled/ColorPickerCircleWrapper";
import ColorPickerTargetWrapper from "../components-styled/ColorPickerTargetWrapper";

const propTypes = {
  position: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

const defaultProps = {};

const ColorPickerCircle = ({ size, width, position }) => (
  <ColorPickerCircleWrapper
    position={position}
    size={size}
    width={width}
    renderToHardwareTextureAndroid
  >
    <ColorPickerTargetWrapper size={size} />
  </ColorPickerCircleWrapper>
);

ColorPickerCircle.propTypes = propTypes;
ColorPickerCircle.defaultProps = defaultProps;

export default ColorPickerCircle;
