/* global window */
import PropTypes from "prop-types";
import React from "react";
import ColorPickerCircleWrapper from "../components-styled/ColorPickerCircleWrapper";
import ColorPickerTargetWrapper from "../components-styled/ColorPickerTargetWrapper";
import validatePosition from "../../../utils/position-validation";
import getPosition from "../../../utils/position";

const propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  isDragging: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
  positionLeft: PropTypes.number.isRequired,
  positionRight: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onDraggingChanged: PropTypes.func.isRequired,
  onPositionChanged: PropTypes.func.isRequired
};

const defaultProps = {};

export default class Handler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onGestureResponderStart = this.onGestureResponderStart.bind(this);
    this.onMouseResponderMove = this.onMouseResponderMove.bind(this);
    this.onTouchResponderMove = this.onTouchResponderMove.bind(this);
    this.onGestureResponderEnd = this.onGestureResponderEnd.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mousemove", this.onMouseResponderMove, true);
    window.addEventListener("touchmove", this.onTouchResponderMove, true);
    window.addEventListener("mouseup", this.onGestureResponderEnd);
    window.addEventListener("touchend", this.onGestureResponderEnd);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.onMouseResponderMove, true);
    window.removeEventListener("touchmove", this.onTouchResponderMove, true);
    window.removeEventListener("mouseup", this.onGestureResponderEnd);
    window.removeEventListener("touchend", this.onGestureResponderEnd);
  }

  onGestureResponderStart(e) {
    // prevent selecting text
    e.preventDefault();
    // parents don't need to know about this event
    e.stopPropagation();
    const { isDisabled } = this.props;
    if (isDisabled) {
      return;
    }
    const { onDraggingChanged } = this.props;
    onDraggingChanged(true);
  }

  onMouseResponderMove(e) {
    const { isDisabled } = this.props;
    if (isDisabled) {
      return;
    }
    const { isDragging } = this.props;
    if (!isDragging) {
      return;
    }
    const { positionLeft, positionRight, onPositionChanged } = this.props;
    // prevent selecting text
    e.preventDefault();
    // prevent any other movement
    e.stopImmediatePropagation();
    validatePosition(
      getPosition(positionLeft, e.clientX, positionRight - positionLeft),
      onPositionChanged
    );
  }

  onTouchResponderMove(e) {
    const { isDisabled } = this.props;
    if (isDisabled) {
      return;
    }
    const { isDragging } = this.props;
    if (!isDragging) {
      return;
    }
    const { positionLeft, positionRight, onPositionChanged } = this.props;
    // prevent selecting text
    e.preventDefault();
    // prevent any other movement
    e.stopImmediatePropagation();
    validatePosition(
      getPosition(
        positionLeft,
        e.changedTouches[0].clientX,
        positionRight - positionLeft
      ),
      onPositionChanged
    );
  }

  onGestureResponderEnd() {
    const { isDisabled } = this.props;
    if (isDisabled) {
      return;
    }
    const { onDraggingChanged } = this.props;
    onDraggingChanged(false);
  }

  render() {
    const { width } = this.props;
    const { position, size } = this.props;
    return (
      <ColorPickerCircleWrapper
        position={position}
        size={size}
        width={width}
        onMouseDown={this.onGestureResponderStart}
        onTouchStart={this.onGestureResponderStart}
      >
        <ColorPickerTargetWrapper size={size} />
      </ColorPickerCircleWrapper>
    );
  }
}

Handler.propTypes = propTypes;
Handler.defaultProps = defaultProps;
