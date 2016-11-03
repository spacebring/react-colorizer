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
  width: React.PropTypes.number.isRequired,
};

const defaultProps = {};

const HuePickerWrapper = ({ children, height, hue, width }) => {
  const newStyle = Object.assign({}, { height, width }, COLOR_PICKER_GRADIENT_OBJ_NATIVE);
  const fill = new LinearGradient([`hsl(${hue}%, 0%, 50%) 0%`, `hsl(${hue}%, 100%, 50%) 100%`], 0, 0, width, 0);
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
