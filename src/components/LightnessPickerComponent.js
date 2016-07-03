import React from 'react';
import { ColorPickerCircleComponent } from './ColorPickerCircleComponent';
import { colorPickerGradient } from '../utils/styles';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  hue: React.PropTypes.number.isRequired,
  saturation: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  onValueChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export const LightnessPickerComponent = ({
  height,
  hue,
  saturation,
  value,
  onValueChanged,
}) => {
  const style = Object.assign({}, colorPickerGradient, {
    height: `${height}px`,
    backgroundImage: `linear-gradient(90deg,
      hsl(${hue}, ${saturation * 100}%, 100%) 0%, 
      hsl(${hue}, ${saturation * 100}%, 50%) 50%, 
      hsl(${hue}, ${saturation * 100}%, 0%) 100%
    )`,
  });
  return (
    <div style={style} >
      <ColorPickerCircleComponent
        size={height / 2}
        position={1 - value}
        top={height / 4}
        onPositionChanged={pos => onValueChanged(1 - pos)}
      />
    </div>
  );
};

LightnessPickerComponent.propTypes = propTypes;
LightnessPickerComponent.defaultProps = defaultProps;
