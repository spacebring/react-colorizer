import React from 'react';
import SaturationPickerWrapper from './SaturationPickerWrapper';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  hue: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  onValueChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

const SaturationPicker = ({ height, hue, value, width, onValueChanged }) => (
  <SaturationPickerWrapper
    height={height}
    position={value}
    style={{
      backgroundImage: `linear-gradient(
        90deg, hsl(${hue}, 0%, 50%) 0%, hsl(${hue}, 100%, 50%) 100%
      )`,
    }}
    width={width}
    onValueChanged={onValueChanged}
  />
);

SaturationPicker.propTypes = propTypes;
SaturationPicker.defaultProps = defaultProps;

export default SaturationPicker;
