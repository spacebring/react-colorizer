import React from 'react';
import LightnessPickerWrapper from '../components-styled/LightnessPickerWrapper';
import ColorPickerCircle from '../../ColorPickerCircle';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  hue: React.PropTypes.number.isRequired,
  saturation: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  onValueChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

const LightnessPicker = ({
  height,
  hue,
  saturation,
  value,
  onValueChanged,
}) => {
  const style = {
    height,
    backgroundImage: `linear-gradient(90deg,
      hsl(${hue}, ${saturation * 100}%, 100%) 0%, 
      hsl(${hue}, ${saturation * 100}%, 50%) 50%, 
      hsl(${hue}, ${saturation * 100}%, 0%) 100%
    )`,
  };
  return (
    <LightnessPickerWrapper style={style} >
      <ColorPickerCircle
        size={height}
        position={1 - value}
        top={0}
        onPositionChanged={pos => onValueChanged(1 - pos)}
      />
    </LightnessPickerWrapper>
  );
};

LightnessPicker.propTypes = propTypes;
LightnessPicker.defaultProps = defaultProps;

export default LightnessPicker;
