import React from 'react';
import { LinearGradient, Shape, Surface } from 'react-native/Libraries/ART/ReactNativeART';
import styled from 'styled-components/native';
import BarWrapper from '../../../BarWrapper';
import GradientWrapper from '../../../../components-styled/GradientWrapper.native';

const BarWrapperStyled = styled(BarWrapper)``;

const propTypes = {
  height: React.PropTypes.number.isRequired,
  hue: React.PropTypes.number.isRequired,
  position: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
};

const defaultProps = {};

const HuePickerWrapper = ({ height, hue, position, width }) => {
  const newStyle = { height, width };
  const fill = new LinearGradient([`hsl(${hue}%, 0%, 50%) 0%`, `hsl(${hue}%, 100%, 50%) 100%`], 0, 0, width, 0);
  return (
    <BarWrapperStyled height={height} position={position} width={width} >
      {children => (
        <GradientWrapper style={newStyle} >
          <Surface height={height} width={width} >
            <Shape
              fill={fill}
              d={`M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`}
            />
          </Surface>
          {children}
        </GradientWrapper>
      )}
    </BarWrapperStyled>
  );
};

HuePickerWrapper.propTypes = propTypes;
HuePickerWrapper.defaultProps = defaultProps;

export default HuePickerWrapper;
