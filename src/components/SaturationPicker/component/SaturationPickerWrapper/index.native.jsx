import PropTypes from 'prop-types';
import React from 'react';
import { LinearGradient, Shape, Surface } from 'react-native/Libraries/ART/ReactNativeART';
import BarWrapper from '../../../BarWrapper';
import GradientWrapper from '../../../../components-styled/GradientWrapper.native';

const propTypes = {
  height: PropTypes.number.isRequired,
  hue: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onValueChanged: PropTypes.func.isRequired,
};

const defaultProps = {};

const HuePickerWrapper = ({ height, hue, position, width, onValueChanged }) => (
  <BarWrapper height={height} position={position} width={width} onValueChanged={onValueChanged} >
    {children => (
      <GradientWrapper style={{ height, width }} >
        <Surface height={height} width={width} >
          <Shape
            fill={new LinearGradient([`hsl(${hue}%, 0%, 50%) 0%`, `hsl(${hue}%, 100%, 50%) 100%`], 0, 0, width, 0)}
            d={`M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`}
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
