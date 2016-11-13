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
  const saturationPickerWrapperStyle = {
    backgroundImage: `linear-gradient(
      90deg, hsl(${hue}, 0%, 50%) 0%, hsl(${hue}, 100%, 50%) 100%
    )`,
  };
  return (
    <SaturationPickerWrapper
      height={height}
      style={saturationPickerWrapperStyle}
      width={width}
      onValueChanged={onValueChanged}
    >
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
