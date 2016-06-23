import React from 'react';
import { ColorPickerCircleComponent } from './ColorPickerCircleComponent';
import { colorPickerGradient, colorPickerHueGradient } from '../utils/styles';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  position: React.PropTypes.number.isRequired,
  onBaseColorChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export const BaseColorPickerComponent = ({
  height,
  position,
  onBaseColorChanged,
}) => {
  const style = Object.assign({}, colorPickerGradient, colorPickerHueGradient, {
    height: `${height}px`,
  });
  return (
    <div style={style} >
      <ColorPickerCircleComponent
        size={height / 2}
        position={position}
        top={height / 4}
        onPositionChanged={onBaseColorChanged}
      />
    </div>
  );
};

BaseColorPickerComponent.propTypes = propTypes;
BaseColorPickerComponent.defaultProps = defaultProps;
