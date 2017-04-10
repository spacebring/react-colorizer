import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import ColorPickerCircleWrapper from '../components-styled/ColorPickerCircleWrapper';
import ColorPickerTargetWrapper from '../components-styled/ColorPickerTargetWrapper';
import validatePosition from '../utils/position-validation';

const propTypes = {
  dragging: React.PropTypes.bool.isRequired,
  position: React.PropTypes.number.isRequired,
  positionLeft: React.PropTypes.number.isRequired,
  positionRight: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,
  top: React.PropTypes.number.isRequired,
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

  /*
  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseMove, true);
    window.addEventListener('touchmove', this.onTouchMove, true);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('touchend', this.onMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseMove, true);
    window.removeEventListener('touchmove', this.onTouchMove, true);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('touchend', this.onMouseUp);
  }
  */

  onPressIn(e) {
    /*
    const parentTargetElement = e.target.parentElement;
    this.setState({
      dragging: true,
      parentLeft: parentTargetElement.getBoundingClientRect().left,
    });
    */
  }

  onMouseMove(e) {
    if (!this.state.dragging) {
      return;
    }
    const { onValueChanged } = this.props;
    e.preventDefault();
    e.stopImmediatePropagation();
    const position = this.getPosition(e.clientX);
    validatePosition(position, onValueChanged);
  }

  onTouchMove(e) {
    if (!this.state.dragging) {
      return;
    }
    const { onValueChanged } = this.props;
    e.preventDefault();
    e.stopImmediatePropagation();
    const position = this.getPosition(e.changedTouches[0].clientX);
    validatePosition(position, onValueChanged);
  }

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
    const { position, size, top, positionLeft, positionRight } = this.props;
    const width = positionRight - positionLeft;
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
