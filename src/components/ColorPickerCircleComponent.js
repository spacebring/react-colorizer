import * as React from 'react';
import autobind from 'autobind-decorator';
import { colorPickerCircle } from '../utils/styles';

export class ColorPickerCircleComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      parentWidth: 0,
      parentLeft: 0,
      position: props.position,
    };

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  @autobind
  onMouseDown(e) {
    this.setState({
      dragging: true,
      parentWidth: e.target.parentElement.clientWidth,
      parentLeft: e.target.parentElement.getBoundingClientRect().left,
    });
  }

  @autobind
  onMouseMove(e) {
    if (!this.state.dragging) {
      return;
    }
    e.stopImmediatePropagation();

    this.setState({
      position: (e.pageX - this.state.parentLeft) / this.state.parentWidth,
    });

    if (this.state.position > 1) {
      this.setState({
        position: 1,
      });
    }
    if (this.state.position < 0) {
      this.setState({
        position: 0,
      });
    }

    this.props.onPositionChanged(this.state.position);
  }

  @autobind
  onMouseUp() {
    this.setState({
      dragging: false,
    });
  }

  render() {
    const size = this.props.size;
    const style = Object.assign({}, colorPickerCircle, {
      height: `${size}px`,
      width: `${size}px`,
      top: `${this.props.top}px`,
      marginLeft: `${- size / 2}px`,
      left: `${this.state.position * 100}%`,
    });

    return (
      <div style={style} onMouseDown={this.onMouseDown}>
      </div>
    );
  }
}

ColorPickerCircleComponent.defaultProps = {
  size: undefined,
  position: undefined,
  top: undefined,
  onPositionChanged: undefined,
};

ColorPickerCircleComponent.propTypes = {
  size: React.PropTypes.any.isRequired,
  position: React.PropTypes.any,
  top: React.PropTypes.any,
  onPositionChanged: React.PropTypes.any,
};
