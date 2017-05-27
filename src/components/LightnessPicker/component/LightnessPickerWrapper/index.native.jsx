import PropTypes from 'prop-types';
import React from 'react';
import { LinearGradient, Shape, Surface } from 'react-native/Libraries/ART/ReactNativeART';
import BarWrapper from '../../../BarWrapper';
import GradientWrapper from '../../../../components-styled/GradientWrapper.native';

const propTypes = {
  height: PropTypes.number.isRequired,
  hue: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  saturationPercent: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

const defaultProps = {};

const HuePickerWrapper = ({ height, hue, position, saturationPercent, width }) => (
  <BarWrapper height={height} position={position} width={width} >
    {children => (
      <GradientWrapper style={{ height, width }} >
        <Surface height={height} width={width} >
          <Shape
            d={`M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`}
            fill={new LinearGradient([
              `hsl(${hue}, ${saturationPercent}%, 100%) 0%`, `hsl(${hue}, ${saturationPercent}%, 50%) 50%`, `hsl(${hue}, ${saturationPercent}%, 0%) 100%`,
            ], 0, 0, width, 0)}
          />
        </Surface>
        {children}
      </GradientWrapper>
    )}
  </BarWrapper>
);

HuePickerWrapper.propTypes = propTypes;
HuePickerWrapper.defaultProps = defaultProps;

export default HuePickerWrapper;
