import React from 'react';
import { View } from 'react-native';
import { LinearGradient, Shape, Surface } from 'react-native/Libraries/ART/ReactNativeART';
// import styled from 'styled-components/native';
import { COLOR_PICKER_GRADIENT_OBJ_NATIVE } from '../../../utils/styles';

/*
export default styled.View`
  ${COLOR_PICKER_GRADIENT_NATIVE}
`;
*/

const propTypes = {
  children: React.PropTypes.object.isRequired,
  height: React.PropTypes.number.isRequired,
  hue: React.PropTypes.number.isRequired,
  saturationPercent: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
};

const defaultProps = {};

const HuePickerWrapper = ({ children, height, width }) => {
  const newStyle = Object.assign({}, { height, width }, COLOR_PICKER_GRADIENT_OBJ_NATIVE);
  const fill = new LinearGradient(['blue', 'red', 'yellow'], 0, 0, height, width);
  return (
    <View style={newStyle} >
      <Surface height={height} width={width} >
        <Shape
          fill={fill}
          d={`M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`}
        />
      </Surface>
      {children}
    </View>
  );
};

HuePickerWrapper.propTypes = propTypes;
HuePickerWrapper.defaultProps = defaultProps;

export default HuePickerWrapper;
