import React from 'react';
import ColorPickerCircleWrapper from '../../components-styled/ColorPickerCircleWrapper';
import ColorPickerTargetWrapper from '../../components-styled/ColorPickerTargetWrapper';
import validatePosition from '../../utils/position-validation';

const propTypes = {
  size: React.PropTypes.number.isRequired,
  position: React.PropTypes.number.isRequired,
  top: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  onPositionChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

// TODO: remove parentLeft
export default class ColorPickerCircle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
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
      parentLeft: parentTargetElement.getBoundingClientRect().left,
    });
  }

  onMouseMove(e) {
    if (!this.state.dragging) {
      return;
    }
    const { onPositionChanged } = this.props;
    e.preventDefault();
    e.stopImmediatePropagation();
    const position = this.getPosition(e.clientX);
    validatePosition(position, onPositionChanged);
  }

  onTouchMove(e) {
    if (!this.state.dragging) {
      return;
    }
    const { onPositionChanged } = this.props;
    e.preventDefault();
    e.stopImmediatePropagation();
    const position = this.getPosition(e.changedTouches[0].clientX);
    validatePosition(position, onPositionChanged);
  }

  onMouseUp() {
    this.setState({
      dragging: false,
    });
  }

  getPosition(positionX) {
    return (positionX - this.state.parentLeft) / this.props.width;
  }

  render() {
    const { position, size, top, width } = this.props;
    const halfSize = size / 2;
    const styleCircle = {
      height: size,
      width: size,
      top,
      left: Math.round(position * width) - halfSize,
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
