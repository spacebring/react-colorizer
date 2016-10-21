import React from 'react';
import ColorPickerCircleWrapper from '../components-styled/ColorPickerCircleWrapper';
import ColorPickerTargetWrapper from '../components-styled/ColorPickerTargetWrapper';

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
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
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

  onMouseDown(e) {
    const parentTargetElement = e.target.parentElement;
    this.setState({
      dragging: true,
      parentWidth: parentTargetElement.clientWidth,
      parentLeft: parentTargetElement.getBoundingClientRect().left,
    });
    ColorPickerCircle.dragging = true;
  }

  onMouseMove(e) {
    if (!this.state.dragging) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    const position = this.getPosition(e.clientX);
    this.validatePosition(position);
  }

  onTouchMove(e) {
    if (!this.state.dragging) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    const position = this.getPosition(e.changedTouches[0].clientX);
    this.validatePosition(position);
  }

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
    const { onPositionChanged } = this.props;
    if (position < 0) {
      onPositionChanged(0);
      return;
    }
    if (position > 1) {
      onPositionChanged(1);
      return;
    }
    onPositionChanged(position);
  }

  render() {
    const { position, size, top } = this.props;
    const styleCircle = {
      height: size,
      width: size,
      top,
      marginLeft: -size / 2,
      left: `${position * 100}%`,
    };
    const styleTarget = {
      height: size / 2,
      width: size / 2,
    };
    return (
      <ColorPickerCircleWrapper
        style={styleCircle}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onMouseDown}
      >
        <ColorPickerTargetWrapper style={styleTarget} />
      </ColorPickerCircleWrapper>
    );
  }
}

ColorPickerCircle.propTypes = propTypes;
ColorPickerCircle.defaultProps = defaultProps;
