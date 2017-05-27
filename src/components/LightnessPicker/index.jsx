import PropTypes from 'prop-types';
import React from 'react';
import LightnessPickerWrapper from './component/LightnessPickerWrapper';

const propTypes = {
  height: PropTypes.number.isRequired,
  hue: PropTypes.number.isRequired,
  saturation: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onValueChanged: PropTypes.func.isRequired,
};

const defaultProps = {};

const LightnessPicker = ({
  height,
  hue,
  saturation,
  value,
  width,
  onValueChanged,
}) => (
  <LightnessPickerWrapper
    height={height}
    hue={hue}
    position={1 - value}
    saturationPercent={saturation * 100}
    width={width}
    onValueChanged={pos => onValueChanged(1 - pos)}
  />
);

LightnessPicker.propTypes = propTypes;
LightnessPicker.defaultProps = defaultProps;

export default LightnessPicker;
