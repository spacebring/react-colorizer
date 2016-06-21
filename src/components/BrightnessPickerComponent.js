import React from 'react';
import { ColorPickerCircleComponent } from './ColorPickerCircleComponent';
import { colorPickerGradient } from '../utils/styles';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  color: React.PropTypes.object,
  onPositionChanged: React.PropTypes.func,
  position: React.PropTypes.number,
};

const defaultProps = {};

export const BrightnessPickerComponent = ({
  height,
  color,
  position,
  onPositionChanged,
}) => {
  const style = Object.assign({}, colorPickerGradient, {
    height: `${height}px`,
    backgroundImage: `linear-gradient(
      90deg, rgb(255, 255, 255) 0%, #${color.toHex()} 50%, rgb(0, 0, 0) 100%
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
