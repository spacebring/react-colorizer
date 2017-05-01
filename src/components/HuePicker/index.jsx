import React from 'react';
import HuePickerWrapper from './component/HuePickerWrapper';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  onValueChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

const HuePicker = ({ height, value, width, onValueChanged }) => (
  <HuePickerWrapper
    height={height}
    position={value / 360}
    width={width}
    onValueChanged={pos => onValueChanged(pos * 360)}
  />
);

HuePicker.propTypes = propTypes;
HuePicker.defaultProps = defaultProps;

export default HuePicker;
