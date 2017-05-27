/* global window */
import PropTypes from 'prop-types';
import React from 'react';
import { HOLD_TIME } from '../utils/config';
import Handler from '../../Handler';
import BarWrapperStyled from '../../../components-styled/BarWrapperStyled';
import getPosition from '../../../utils/position';

const propTypes = {
  height: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onValueChanged: PropTypes.func.isRequired,
};

const defaultProps = {};

export default class BarWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.cache = {
      holdTimer: null,
      holdHandler: null,
    };
    this.state = {
      dragging: false,
      isDomInitialized: false,
    };
    this.onDraggingChanged = this.onDraggingChanged.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchCancel = this.onTouchCancel.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onSetBarDom = this.onSetBarDom.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('touchend', this.onTouchEnd);
    window.addEventListener('touchcancel', this.onTouchCancel);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('touchend', this.onTouchEnd);
    window.removeEventListener('touchcancel', this.onTouchCancel);
  }

  onMouseDown(e) {
    const targetBoundingClientRect = e.target.getBoundingClientRect();
    const clientX = e.clientX;
    this.setOnHoldTimerInitIfNeed(e, this.getOnHoldHandler(clientX, targetBoundingClientRect));
  }

  onTouchStart(e) {
    const targetBoundingClientRect = e.target.getBoundingClientRect();
    const clientX = e.touches[0].clientX;
    this.setOnHoldTimerInitIfNeed(e, this.getOnHoldHandler(clientX, targetBoundingClientRect));
  }

  onMouseUp() {
    this.setCancelTimer();
  }

  onTouchEnd() {
    this.setCancelTimer();
  }

  onTouchCancel() {
    this.setCancelTimer();
  }

  onDraggingChanged(dragging) {
    this.setState({
      dragging,
    });
  }

  onSetBarDom(barDom) {
    this.barDom = barDom;
    this.setState(() => ({
      isDomInitialized: true,
    }));
  }

  getOnHoldHandler(clientX, targetBoundingClientRect) {
    return () => {
      const { onValueChanged } = this.props;
      const newPosition = getPosition(
        targetBoundingClientRect.left,
        clientX,
        targetBoundingClientRect.width,
      );
      onValueChanged(newPosition);
      this.onDraggingChanged(true);
    };
  }

  setOnHoldTimerInitIfNeed(e, holdHandler) {
    const holdTimer = this.cache.holdTimer;
    // allow only left button
    if (
      (holdTimer === null || holdTimer === undefined) &&
      (e.button === 0 || e.button === undefined)
    ) {
      this.cache.holdHandler = holdHandler;
      this.cache.holdTimer = setTimeout(this.cache.holdHandler, HOLD_TIME, e);
    }
  }

  setCancelTimer() {
    clearTimeout(this.cache.holdTimer);
    this.cache.holdTimer = null;
  }

  renderHandler(height, position, onValueChanged) {
    const { width } = this.props;
    const { dragging, isDomInitialized } = this.state;
    if (!isDomInitialized) {
      return null;
    }
    const barDomBoundingClientRect = this.barDom.getBoundingClientRect();
    return (
      <Handler
        barDom={this.barDom}
        dragging={dragging}
        position={position}
        positionLeft={barDomBoundingClientRect.left}
        positionRight={barDomBoundingClientRect.right}
        size={height}
        width={width}
        onDraggingChanged={this.onDraggingChanged}
        onPositionChanged={onValueChanged}
      />
    );
  }

  render() {
    const { height, position, width, onValueChanged, ...props } = this.props;
    return (
      <BarWrapperStyled
        innerRef={this.onSetBarDom}
        styleHeight={height}
        styleWidth={width}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
        {...props}
      >
        {this.renderHandler(height, position, onValueChanged)}
      </BarWrapperStyled>
    );
  }
}

BarWrapper.propTypes = propTypes;
BarWrapper.defaultProps = defaultProps;
