import PropTypes from 'prop-types';
import React from 'react';
import SaturationPickerWrapper from './component/SaturationPickerWrapper';

const propTypes = {
  height: PropTypes.number.isRequired,
  hue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onValueChanged: PropTypes.func.isRequired,
};

const defaultProps = {};

const SaturationPicker = ({ height, hue, value, width, onValueChanged }) => (
  <SaturationPickerWrapper
    height={height}
    hue={hue}
    position={value}
    width={width}
    onValueChanged={onValueChanged}
  />
);

SaturationPicker.propTypes = propTypes;
SaturationPicker.defaultProps = defaultProps;

export default SaturationPicker;
