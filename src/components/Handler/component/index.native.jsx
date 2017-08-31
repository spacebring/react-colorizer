import PropTypes from 'prop-types';
import React from 'react';
import { PanResponder } from 'react-native';
import ColorPickerCircleWrapper from '../components-styled/ColorPickerCircleWrapper';
import ColorPickerTargetWrapper from '../components-styled/ColorPickerTargetWrapper';
import validatePosition from '../utils/position-validation';
import getPosition from '../../../utils/position';

const propTypes = {
  dragging: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
  positionLeft: PropTypes.number.isRequired,
  positionRight: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onDraggingChanged: PropTypes.func.isRequired,
  onPositionChanged: PropTypes.func.isRequired,
};

const defaultProps = {};

export default class ColorPickerCircle extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchRelease = this.onTouchRelease.bind(this);
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onPanResponderGrant: this.onTouchStart,
      onPanResponderMove: this.onTouchMove,
      onPanResponderRelease: this.onTouchRelease,
      onPanResponderTerminationRequest: () => false,
      onStartShouldSetPanResponderCapture: () => true,
    });
  }

  onTouchStart() {
    this.props.onDraggingChanged(true);
  }

  onTouchMove(e, gestureState) {
    const { dragging, positionLeft, positionRight, onPositionChanged } = this.props;
    if (!dragging) {
      return;
    }
    const position = getPosition(
      positionLeft,
      gestureState.moveX,
      positionRight - positionLeft,
    );
    validatePosition(position, onPositionChanged);
  }

  onTouchRelease() {
    this.props.onDraggingChanged(false);
  }

  render() {
    const { size, width, position } = this.props;
    return (
      <ColorPickerCircleWrapper
        position={position}
        size={size}
        width={width}
        renderToHardwareTextureAndroid
        {...this.panResponder.panHandlers}
      >
        <ColorPickerTargetWrapper size={size} />
      </ColorPickerCircleWrapper>
    );
  }
}

ColorPickerCircle.propTypes = propTypes;
ColorPickerCircle.defaultProps = defaultProps;
