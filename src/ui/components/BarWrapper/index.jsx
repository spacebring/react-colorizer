import React from 'react';
import ColorPickerCircle from '../ColorPickerCircle';
import getPosition from '../../utils/position';

const propTypes = {
  className: React.PropTypes.string,
  height: React.PropTypes.number.isRequired,
  position: React.PropTypes.number.isRequired,
  style: React.PropTypes.object,
  width: React.PropTypes.number.isRequired,
  onValueChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

class BarWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
    };
    this.onDraggingChanged = this.onDraggingChanged.bind(this);
    this.onTapStart = this.onTapStart.bind(this);
  }

  onDraggingChanged(dragging) {
    this.setState({
      dragging,
    });
  }

  onTapStart(e) {
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

  render() {
    const { className, height, position, style, width, onValueChanged } = this.props;
    return (
      <div
        className={className}
        ref={(barDom) => { this.barDom = barDom; }}
        style={style}
        onMouseDown={this.onTapStart}
        onTouchStart={this.onTapStart}
      >
        <ColorPickerCircle
          barDom={this.barDom}
          dragging={this.state.dragging}
          position={position}
          size={height}
          top={0}
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

export default BarWrapper;
