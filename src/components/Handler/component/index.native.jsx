import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import ColorPickerCircleWrapper from '../components-styled/ColorPickerCircleWrapper';
import ColorPickerTargetWrapper from '../components-styled/ColorPickerTargetWrapper';

const propTypes = {
  dragging: React.PropTypes.bool.isRequired,
  position: React.PropTypes.number.isRequired,
  positionLeft: React.PropTypes.number.isRequired,
  positionRight: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,
  top: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  onDraggingChanged: React.PropTypes.func.isRequired,
  onValueChanged: React.PropTypes.func.isRequired,
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
    this.setState({
      dragging: false,
    });
  }

  getPosition(positionX) {
    const { positionLeft, positionRight } = this.props;
    const width = positionRight - positionLeft;
    return (positionX - this.state.parentLeft) / width;
  }

  render() {
    const { position, size, top, width } = this.props;
    const halfSize = size / 2;
    const styleCircle = {
      height: size,
      width: size,
      top,
      left: Math.round(position * width) - halfSize,
      borderRadius: halfSize,
    };
    const styleTarget = {
      height: halfSize,
      width: halfSize,
      borderRadius: halfSize,
    };
    return (
      <TouchableWithoutFeedback onPressIn={this.onPressIn} >
        <ColorPickerCircleWrapper style={styleCircle} >
          <ColorPickerTargetWrapper style={styleTarget} />
        </ColorPickerCircleWrapper>
      </TouchableWithoutFeedback>
    );
  }
}

ColorPickerCircle.propTypes = propTypes;
ColorPickerCircle.defaultProps = defaultProps;
