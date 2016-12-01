import React from 'react';
import ColorPickerCircleWrapper from '../components-styled/ColorPickerCircleWrapper';
import ColorPickerTargetWrapper from '../components-styled/ColorPickerTargetWrapper';
import validatePosition from '../utils/position-validation';
import getPosition from '../../../utils/position';

const propTypes = {
  size: React.PropTypes.number.isRequired,
  position: React.PropTypes.number.isRequired,
  top: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  onPositionChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

export default class ColorPickerCircle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
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
    e.preventDefault();
    e.stopPropagation();
    // const parentTargetElement = e.target.parentElement;
    this.setState({
      dragging: true,
    });
  }

  onMouseMove(e) {
    if (!this.state.dragging) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    const { width, onPositionChanged } = this.props;
    const barLeft = e.target.parentElement.getBoundingClientRect().left;
    const position = getPosition(barLeft, e.clientX, width);
    validatePosition(position, onPositionChanged);
  }

  onTouchMove(e) {
    if (!this.state.dragging) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    const { width, onPositionChanged } = this.props;
    const barLeft = e.target.parentElement.getBoundingClientRect().left;
    const position = getPosition(barLeft, e.changedTouches[0].clientX, width);
    validatePosition(position, onPositionChanged);
  }

  onMouseUp() {
    this.setState({
      dragging: false,
    });
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
