import React from 'react';
import ColorPickerCircle from './ColorPickerCircle';
import { colorPickerGradient } from '../utils/styles';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  hue: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  onValueChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

const SaturationPicker = ({ height, hue, value, onValueChanged }) => {
  const style = Object.assign({}, colorPickerGradient, {
    height: `${height}px`,
    backgroundImage: `linear-gradient(
      90deg, hsl(${hue}, 0%, 50%) 0%, hsl(${hue}, 100%, 50%) 100%
    )`,
  });
  return (
    <div style={style} >
      <ColorPickerCircle
        size={height}
        position={value}
        top={0}
        onPositionChanged={onValueChanged}
      />
    </div>
  );
};

SaturationPicker.propTypes = propTypes;
SaturationPicker.defaultProps = defaultProps;

export default SaturationPicker;
