import React from 'react';
import ColorPickerCircle from '../ColorPickerCircle';
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
  }

  render() {
    const { height, position, width, onValueChanged, ...props } = this.props;
    return (
      <div
        ref={this.onSetBarDom}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
        {...props}
      >
        <ColorPickerCircle
          barDom={this.barDom}
          dragging={this.state.dragging}
          position={position}
          size={height}
          width={width}
          onDraggingChanged={this.onDraggingChanged}
          onPositionChanged={onValueChanged}
        />
      </div>
    );
  }
}

BarWrapper.propTypes = propTypes;
BarWrapper.defaultProps = defaultProps;
