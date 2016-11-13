import React from 'react';
import HuePickerWrapper from '../components-styled/HuePickerWrapper';
import ColorPickerCircle from '../../ColorPickerCircle';
import getPosition from '../../../utils/position';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  onValueChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

const HuePicker = ({ height, value, width, onValueChanged }) => {
  return (
    <HuePickerWrapper height={height} width={width} onValueChanged={pos => onValueChanged(pos * 360)} >
      <ColorPickerCircle
        position={value / 360}
        size={height}
        top={0}
        width={width}
        onPositionChanged={pos => onValueChanged(pos * 360)}
      />
    </HuePickerWrapper>
  );
}

HuePicker.propTypes = propTypes;
HuePicker.defaultProps = defaultProps;

export default HuePicker;
