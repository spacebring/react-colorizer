import React from 'react';
import { ColorPickerCircleComponent } from './ColorPickerCircleComponent';
import { colorPickerGradient } from '../utils/styles';

const propTypes = {
  color: React.PropTypes.string.isRequired,
  height: React.PropTypes.number.isRequired,
  position: React.PropTypes.number.isRequired,
  onPositionChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export const BrightnessPickerComponent = ({
  color,
  height,
  position,
  onPositionChanged,
}) => {
  const style = Object.assign({}, colorPickerGradient, {
    height: `${height}px`,
    backgroundImage: `linear-gradient(
      90deg, rgb(0, 0, 0) 0%, #${color} 50%, rgb(255, 255, 255) 100%
    )`,
  });
  return (
    <div style={style} >
      <ColorPickerCircleComponent
        size={height / 2}
        position={position}
        top={height / 4}
        onPositionChanged={onPositionChanged}
      />
    </div>
  );
};

BrightnessPickerComponent.propTypes = propTypes;
BrightnessPickerComponent.defaultProps = defaultProps;
