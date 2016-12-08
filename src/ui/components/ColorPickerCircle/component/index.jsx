import React from 'react';
import ColorPickerCircleWrapper from '../components-styled/ColorPickerCircleWrapper';
import ColorPickerTargetWrapper from '../components-styled/ColorPickerTargetWrapper';
import validatePosition from '../utils/position-validation';
import getPosition from '../../../utils/position';

const propTypes = {
  barDom: React.PropTypes.object,
  dragging: React.PropTypes.bool.isRequired,
  position: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,
  top: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  onDraggingChanged: React.PropTypes.func.isRequired,
  onPositionChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export default class ColorPickerCircle extends React.Component {

  constructor(props) {
    super(props);
    this.onGestureResponderStart = this.onGestureResponderStart.bind(this);
    this.onMouseResponderMove = this.onMouseResponderMove.bind(this);
    this.onTouchResponderMove = this.onTouchResponderMove.bind(this);
    this.onGestureResponderEnd = this.onGestureResponderEnd.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.onMouseResponderMove, true);
    window.addEventListener('touchmove', this.onTouchResponderMove, true);
    window.addEventListener('mouseup', this.onGestureResponderEnd);
    window.addEventListener('touchend', this.onGestureResponderEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMouseResponderMove, true);
    window.removeEventListener('touchmove', this.onTouchResponderMove, true);
    window.removeEventListener('mouseup', this.onGestureResponderEnd);
    window.removeEventListener('touchend', this.onGestureResponderEnd);
  }

  onGestureResponderStart(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onDraggingChanged(true);
  }

  onMouseResponderMove(e) {
    if (!this.props.dragging) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    const { width, onPositionChanged } = this.props;
    const barLeft = this.props.barDom.getBoundingClientRect().left;
    const position = getPosition(barLeft, e.clientX, width);
    validatePosition(position, onPositionChanged);
  }

  onTouchResponderMove(e) {
    if (!this.props.dragging) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    const { width, onPositionChanged } = this.props;
    const barLeft = this.props.barDom.getBoundingClientRect().left;
    const position = getPosition(barLeft, e.changedTouches[0].clientX, width);
    validatePosition(position, onPositionChanged);
  }

  onGestureResponderEnd() {
    this.props.onDraggingChanged(false);
  }

  render() {
    const { position, size, top, width } = this.props;
    const halfSize = size / 2;
    const styleCircle = {
      height: size,
      width: size,
      top,
      left: 0,
      transform: `translateX(${Math.round(position * width) - halfSize}px)`,
    };
    const styleTarget = {
      height: halfSize,
      width: halfSize,
    };
    return (
      <ColorPickerCircleWrapper
        style={styleCircle}
        onMouseDown={this.onGestureResponderStart}
        onTouchStart={this.onGestureResponderStart}
      >
        <ColorPickerTargetWrapper style={styleTarget} />
      </ColorPickerCircleWrapper>
    );
  }
}

ColorPickerCircle.propTypes = propTypes;
ColorPickerCircle.defaultProps = defaultProps;
