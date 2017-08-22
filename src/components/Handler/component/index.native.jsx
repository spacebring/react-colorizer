import PropTypes from 'prop-types';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
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
    this.onPressIn = this.onPressIn.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onPressIn() { }

  onMouseMove() { }

  onTouchMove() { }

  onMouseUp() {
    this.setState(() => ({
      dragging: false,
    }));
  }

  getPosition(positionX) {
    const { positionLeft, positionRight } = this.props;
    const width = positionRight - positionLeft;
    return (positionX - this.state.parentLeft) / width;
  }

  render() {
    const { position, size, top, width } = this.props;
    return (
      <TouchableWithoutFeedback onPressIn={this.onPressIn} >
        <ColorPickerCircleWrapper position={position} width={width} size={size} top={top} >
          <ColorPickerTargetWrapper size={size} />
        </ColorPickerCircleWrapper>
      </TouchableWithoutFeedback>
    );
  }
}

ColorPickerCircle.propTypes = propTypes;
ColorPickerCircle.defaultProps = defaultProps;
