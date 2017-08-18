import PropTypes from 'prop-types';
import React from 'react';
import { LinearGradient, Shape, Surface } from 'react-native/Libraries/ART/ReactNativeART';
import styled from 'styled-components/native';
import BarWrapper from '../../../BarWrapper';
import GradientWrapper from '../../../../components-styled/GradientWrapper.native';

const BarWrapperStyled = styled(BarWrapper)``;

const propTypes = {
  height: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

const defaultProps = {};

const HuePickerWrapper = ({ height, position, width }) => {
  const newStyle = { height, width };
  const fill = new LinearGradient([
    'hsl(0, 100%, 50%) 0%',
    'hsl(60, 100%, 50%) 17%',
    'hsl(120, 100%, 50%) 33%',
    'hsl(180, 100%, 50%) 50%',
    'hsl(240, 100%, 50%) 67%',
    'hsl(300, 100%, 50%) 83%',
    'hsl(360, 100%, 50%) 100%'],
    0,
    0,
    width,
    0,
  );
  return (
    <BarWrapperStyled height={height} position={position} width={width} >
      {children => (
        <GradientWrapper style={newStyle} >
          <Surface height={height} width={width} style={{ position: 'absolute', top: 0 }} >
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
