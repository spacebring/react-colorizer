import PropTypes from "prop-types";
import React from "react";
import { PanResponder } from "react-native";
import BarWrapperStyled from "../components-styled/BarWrapperStyled.native";
import { HOLD_TIME, TOLERANCE } from "../utils/config";
import Handler from "../../Handler";
import getPosition from "../../../utils/position";
import validatePosition from "../../../utils/position-validation";

const propTypes = {
  children: PropTypes.any.isRequired,
  height: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onValueChanged: PropTypes.func.isRequired
};

const defaultProps = {};

export default class BarWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.cache = {
      holdTimer: null,
      holdHandler: null,
      holdPositionX: null,
      holdPositionY: null
    };
    this.state = {
      dragging: false,
      holding: false,
      isDomInitialized: false
    };
    this.onDraggingChanged = this.onDraggingChanged.bind(this);
    this.onSetBarDom = this.onSetBarDom.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchRelease = this.onTouchRelease.bind(this);
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: this.onTouchStart,
      onPanResponderMove: this.onTouchMove,
      onPanResponderRelease: this.onTouchRelease,
      onPanResponderTerminationRequest: () => false
    });
  }

  onTouchStart(e, gestureState) {
    const { width } = this.props;
    const targetBoundingClientRect = {
      left: 0,
      width
    };
    this.cache.holdPositionX = gestureState.x0;
    this.cache.holdPositionY = gestureState.y0;
    this.setState(() => ({
      holding: true
    }));
    this.setOnHoldTimerInitIfNeed(
      this.getOnHoldHandler(gestureState.x0, targetBoundingClientRect)
    );
  }

  onTouchMove(e, gestureState) {
    const {
      width,
      onValueChanged,
      position, height
    } = this.props;
    const { dragging, holding } = this.state;
    if (holding) {
      this.setState(() => ({ holding: false }));
    }
    // disable move if moved over handler
    if (!dragging && (!holding || Math.abs(position * width - gestureState.moveX) > height / 2)) {
      return;
    }
    if (!dragging) {
      this.onDraggingChanged(true);
    }
    const newPosition = getPosition(
      0,
      gestureState.moveX,
      width
    );
    validatePosition(newPosition, onValueChanged);
  }

  onTouchRelease() {
    this.onDraggingChanged(false);
    this.setCancelTimer();
  }

  onDraggingChanged(dragging) {
    this.setState(() => ({
      dragging
    }));
  }

  onSetBarDom(barDom) {
    this.barDom = barDom;
    this.setState(() => ({
      isDomInitialized: true
    }));
  }

  getOnHoldHandler(clientX, targetBoundingClientRect) {
    return () => {
      const { onValueChanged } = this.props;
      if (this.state.holding) {
        const newPosition = getPosition(
          targetBoundingClientRect.left,
          clientX,
          targetBoundingClientRect.width
        );
        onValueChanged(newPosition);
        this.onDraggingChanged(true);
      }
    };
  }

  setOnHoldTimerInitIfNeed(holdHandler) {
    const holdTimer = this.cache.holdTimer;
    if (holdTimer === null || holdTimer === undefined) {
      this.cache.holdHandler = holdHandler;
      this.cache.holdTimer = setTimeout(this.cache.holdHandler, HOLD_TIME);
    }
  }

  setCancelTimer() {
    clearTimeout(this.cache.holdTimer);
    this.cache.holdTimer = null;
    this.cache.holdPositionX = null;
    this.setState(() => ({
      holding: false
    }));
  }

  checkHolding(e, gestureState) {
    if (this.state.holding) {
      const diffX = Math.abs(this.cache.holdPositionX - gestureState.moveX);
      const diffY = Math.abs(this.cache.holdPositionY - gestureState.moveY);
      if (
        (diffX !== 0 && diffX > TOLERANCE) ||
        (diffY !== 0 && diffY > TOLERANCE)
      ) {
        this.setState(() => ({
          holding: false
        }));
      }
    } else {
      this.setState(() => ({ holding: true }));
    }
  }

  renderHandler(height, position, onValueChanged) {
    const { width } = this.props;
    const { isDomInitialized } = this.state;
    if (!isDomInitialized) {
      return null;
    }
    return (
      <Handler
        position={position}
        size={height}
        width={width}
      />
    );
  }

  render() {
    const {
      children,
      height,
      position,
      width,
      onValueChanged,
      ...props
    } = this.props;
    return (
      <BarWrapperStyled
        ref={this.onSetBarDom}
        style={{ height, width }}
        {...props}
        {...this.panResponder.panHandlers}
      >
        {children}
        {this.renderHandler(height, position, onValueChanged)}
      </BarWrapperStyled>
    );
  }
}

BarWrapper.propTypes = propTypes;
BarWrapper.defaultProps = defaultProps;
