import React from 'react';
import HuePickerWrapper from '../components-styled/HuePickerWrapper';
import ColorPickerCircle from '../../ColorPickerCircle';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  onValueChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

const HuePicker = ({ height, value, onValueChanged }) => {
  const style = {
    height,
  };
  return (
    <HuePickerWrapper style={style} >
      <ColorPickerCircle
        size={height}
        position={value / 360}
        top={0}
        onPositionChanged={pos => onValueChanged(pos * 360)}
      />
    </HuePickerWrapper>
  );
};

HuePicker.propTypes = propTypes;
HuePicker.defaultProps = defaultProps;

export default HuePicker;
