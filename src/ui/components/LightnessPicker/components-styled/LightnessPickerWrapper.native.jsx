import React from 'react';
import { LinearGradient, Shape, Surface } from 'react-native/Libraries/ART/ReactNativeART';
import styled from 'styled-components/native';
import BarWrapper from '../../BarWrapper';
import GradientObjNative from '../../../components-styled/GradientObjNative';

const BarWrapperStyled = styled(BarWrapper)``;

const propTypes = {
  height: React.PropTypes.number.isRequired,
  hue: React.PropTypes.number.isRequired,
  position: React.PropTypes.number.isRequired,
  saturationPercent: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
};

const defaultProps = {};

const HuePickerWrapper = ({ height, hue, position, saturationPercent, width }) => {
  const newStyle = { height, width };
  const fill = new LinearGradient([
    `hsl(${hue}, ${saturationPercent}%, 100%) 0%`, `hsl(${hue}, ${saturationPercent}%, 50%) 50%`, `hsl(${hue}, ${saturationPercent}%, 0%) 100%`,
  ], 0, 0, width, 0);
  return (
    <BarWrapperStyled height={height} position={position} width={width} >
      {children => (
        <GradientObjNative style={newStyle} >
          <Surface height={height} width={width} >
            <Shape
              fill={fill}
              d={`M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`}
            />
          </Surface>
          {children}
        </GradientObjNative>
      )}
    </BarWrapperStyled>
  );
};

HuePickerWrapper.propTypes = propTypes;
HuePickerWrapper.defaultProps = defaultProps;

export default HuePickerWrapper;
