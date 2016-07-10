import React from 'react';
import { ColorPickerCircleComponent } from './ColorPickerCircleComponent';
import { colorPickerGradient, colorPickerHueGradient } from '../utils/styles';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  onValueChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export const HuePickerComponent = ({
  height,
  value,
  onValueChanged,
}) => {
  const style = Object.assign({}, colorPickerGradient, colorPickerHueGradient, {
    height: `${height}px`,
  });
  return (
    <div style={style} >
      <ColorPickerCircleComponent
        size={height}
        position={value / 360}
        top={0}
        onPositionChanged={pos => onValueChanged(pos * 360)}
      />
    </div>
  );
};

HuePickerComponent.propTypes = propTypes;
HuePickerComponent.defaultProps = defaultProps;
