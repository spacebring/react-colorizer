import PropTypes from "prop-types";
import React from "react";
import { PanResponder } from "react-native";
import BarWrapperStyled from "../components-styled/BarWrapperStyled.native";
import { HOLD_TIME, TOLERANCE } from "../utils/config";
import Handler from "../../Handler";
import getPosition from "../../../utils/position";

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
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: this.onTouchStart,
      onPanResponderMove: this.onTouchMove,
      onPanResponderRelease: this.onTouchRelease
    });
  }

  onTouchStart(e, gestureState) {
    const { width } = this.props;
    const targetBoundingClientRect = {
      left: 0,
      width
    };
    this.cache.holdPositionX = gestureState.moveX;
    this.cache.holdPositionY = gestureState.moveY;
    this.setState(() => ({
      holding: true
    }));
    this.setOnHoldTimerInitIfNeed(
      this.getOnHoldHandler(gestureState.moveX, targetBoundingClientRect)
    );
  }

  onTouchMove(e, gestureState) {
    this.checkHolding(e, gestureState);
  }

  onTouchRelease() {
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
    }
  }

  renderHandler(height, position, onValueChanged) {
    const { width } = this.props;
    const { dragging, isDomInitialized } = this.state;
    if (!isDomInitialized) {
      return null;
    }
    return (
      <Handler
        barDom={this.barDom}
        dragging={dragging}
        position={position}
        positionLeft={0}
        positionRight={width}
        size={height}
        width={width}
        onDraggingChanged={this.onDraggingChanged}
        onPositionChanged={onValueChanged}
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
      >
        {children}
        {this.renderHandler(height, position, onValueChanged)}
      </BarWrapperStyled>
    );
  }
}

BarWrapper.propTypes = propTypes;
BarWrapper.defaultProps = defaultProps;
