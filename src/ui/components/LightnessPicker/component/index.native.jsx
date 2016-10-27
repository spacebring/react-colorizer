import React from 'react';
import LightnessPickerWrapper from '../components-styled/LightnessPickerWrapper';
import ColorPickerCircle from '../../ColorPickerCircle';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  hue: React.PropTypes.number.isRequired,
  saturation: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  onValueChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

const LightnessPicker = ({
  height,
  hue,
  saturation,
  value,
  width,
  onValueChanged,
}) => {
  const saturationPercent = saturation * 100;
  return (
    <LightnessPickerWrapper
      height={height}
      hue={hue}
      saturationPercent={saturationPercent}
      width={width}
    >
      <ColorPickerCircle
        size={height}
        position={1 - value}
        top={0}
        width={width}
        onPositionChanged={pos => onValueChanged(1 - pos)}
      />
    </LightnessPickerWrapper>
  );
};

LightnessPicker.propTypes = propTypes;
LightnessPicker.defaultProps = defaultProps;

export default LightnessPicker;
