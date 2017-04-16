import React from 'react';
import Handler from '../Handler';
import getPosition from '../../utils/position';

const propTypes = {
  height: React.PropTypes.number.isRequired,
  position: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  onValueChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export default class BarWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      isDomInitialized: false,
    };
    this.onDraggingChanged = this.onDraggingChanged.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onSetBarDom = this.onSetBarDom.bind(this);
  }

  onDraggingChanged(dragging) {
    this.setState({
      dragging,
    });
  }

  onMouseDown(e) {
    const { onValueChanged } = this.props;
    const targetBoundingClientRect = e.target.getBoundingClientRect();
    const newPosition = getPosition(
      targetBoundingClientRect.left,
      e.clientX,
      targetBoundingClientRect.width,
    );
    onValueChanged(newPosition);
    this.onDraggingChanged(true);
  }

  onTouchStart(e) {
    const { onValueChanged } = this.props;
    const targetBoundingClientRect = e.target.getBoundingClientRect();
    const newPosition = getPosition(
      targetBoundingClientRect.left,
      e.touches[0].clientX,
      targetBoundingClientRect.width,
    );
    onValueChanged(newPosition);
    this.onDraggingChanged(true);
  }

  onSetBarDom(barDom) {
    this.barDom = barDom;
    this.setState(() => ({
      isDomInitialized: true,
    }));
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
    const { height, position, onValueChanged, ...props } = this.props;
    return (
      <div
        ref={this.onSetBarDom}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
        {...props}
      >
        {this.renderHandler(height, position, onValueChanged)}
      </div>
    );
  }
}

BarWrapper.propTypes = propTypes;
BarWrapper.defaultProps = defaultProps;
