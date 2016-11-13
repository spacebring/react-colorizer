import React from 'react';
import SaturationPickerWrapper from '../components-styled/SaturationPickerWrapper';
import ColorPickerCircle from '../../ColorPickerCircle';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  hue: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  onValueChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

const SaturationPicker = ({ height, hue, value, width, onValueChanged }) => {
  return (
    <SaturationPickerWrapper height={height} hue={hue} width={width} onValueChanged={onValueChanged} >
      <ColorPickerCircle
        position={value}
        size={height}
        top={0}
        width={width}
        onPositionChanged={onValueChanged}
      />
    </SaturationPickerWrapper>
  );
};

SaturationPicker.propTypes = propTypes;
SaturationPicker.defaultProps = defaultProps;

export default SaturationPicker;
