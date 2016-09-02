import React from 'react';
import ColorPickerCircle from './ColorPickerCircle';
import { colorPickerGradient, colorPickerHueGradient } from '../utils/styles';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  onValueChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

const HuePicker = ({ height, value, onValueChanged }) => {
  const style = Object.assign({}, colorPickerGradient, colorPickerHueGradient, {
    height: `${height}px`,
  });
  return (
    <div style={style} >
      <ColorPickerCircle
        size={height}
        position={value / 360}
        top={0}
        onPositionChanged={pos => onValueChanged(pos * 360)}
      />
    </div>
  );
};

HuePicker.propTypes = propTypes;
HuePicker.defaultProps = defaultProps;

export default HuePicker;
