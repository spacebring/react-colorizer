import React from 'react';
import autobind from 'autobind-decorator';
import { colorPickerCircle, colorPickerTarget } from '../utils/styles';

const propTypes = {
  size: React.PropTypes.number.isRequired,
  position: React.PropTypes.number.isRequired,
  top: React.PropTypes.number.isRequired,
  onPositionChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

// TODO: do not use static ColorPickerCircle
// TODO: do not use dom so much, remove 'parentWidth' and 'parentLeft' from state
export default class ColorPickerCircle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      parentWidth: 0,
      parentLeft: 0,
    };
  }

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

  @autobind
  onMouseDown(e) {
    const parentTargetElement = e.target.parentElement;
    this.setState({
      dragging: true,
      parentWidth: parentTargetElement.clientWidth,
      parentLeft: parentTargetElement.getBoundingClientRect().left,
    });
    ColorPickerCircle.dragging = true;
  }

  @autobind
  onMouseMove(e) {
    if (!this.state.dragging) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    const position = this.getPosition(e.clientX);
    this.validatePosition(position);
  }

  @autobind
  onTouchMove(e) {
    if (!this.state.dragging) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    const position = this.getPosition(e.changedTouches[0].clientX);
    this.validatePosition(position);
  }

  @autobind
  onMouseUp() {
    this.setState({
      dragging: false,
    });
    ColorPickerCircle.dragging = false;
  }

  getPosition(positionX) {
    return (positionX - this.state.parentLeft) / this.state.parentWidth;
  }

  validatePosition(position) {
    if (position < 0) {
      this.props.onPositionChanged(0);
      return;
    }
    if (position > 1) {
      this.props.onPositionChanged(1);
      return;
    }
    this.props.onPositionChanged(position);
  }

  render() {
    const { position, size, top } = this.props;
    const styleCircle = Object.assign({}, colorPickerCircle, {
      height: `${size}px`,
      width: `${size}px`,
      top: `${top}px`,
      marginLeft: `${-size / 2}px`,
      left: `${position * 100}%`,
    });
    const styleTarget = Object.assign({}, colorPickerTarget, {
      height: `${size / 2}px`,
      width: `${size / 2}px`,
    });

    return (
      <div
        style={styleCircle}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onMouseDown}
      >
        <div style={styleTarget} />
      </div>
    );
  }
}

ColorPickerCircle.propTypes = propTypes;
ColorPickerCircle.defaultProps = defaultProps;
