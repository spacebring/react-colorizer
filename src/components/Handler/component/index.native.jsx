import PropTypes from 'prop-types';
import React from 'react';
import { PanResponder } from 'react-native';
import ColorPickerCircleWrapper from '../components-styled/ColorPickerCircleWrapper';
import ColorPickerTargetWrapper from '../components-styled/ColorPickerTargetWrapper';

const propTypes = {
  dragging: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
  positionLeft: PropTypes.number.isRequired,
  positionRight: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onDraggingChanged: PropTypes.func.isRequired,
  onValueChanged: PropTypes.func.isRequired,
};

const defaultProps = {};

export default class ColorPickerCircle extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      parentLeft: 0,
    };
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchRelease = this.onTouchRelease.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: this.onTouchStart,
      onPanResponderMove: this.onTouchMove,
      onPanResponderRelease: this.onTouchRelease,
    });
  }

  onTouchStart(e, gestureState) {
    console.warn('Touch started');
  }

  onTouchMove(e, gestureState) {
    console.warn('Touch moved ' + gestureState.dx);
  }

  onTouchRelease(e, gestureState) {
    console.warn('Touch released');
  }

  onMouseUp() {
    this.setState(() => ({
      dragging: false,
    }));
  }

  render() {
    const { size, top, width, position } = this.props;
    return (
      <ColorPickerCircleWrapper
        position={position}
        width={width}
        size={size}
        top={top}
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
