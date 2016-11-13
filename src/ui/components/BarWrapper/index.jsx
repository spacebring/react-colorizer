import React from 'react';
import getPosition from '../../utils/position';

const propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  onValueChanged: React.PropTypes.func.isRequired,
};

const defaultProps = {};

class BarWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.onTapStart = this.onTapStart.bind(this);
  }

  onTapStart(e) {
    const { width, onValueChanged } = this.props;
    const hueBarLeft = e.target.getBoundingClientRect().left;
    const newPosition = getPosition(hueBarLeft, e.clientX, width);
    onValueChanged(newPosition);
  }

  render() {
    const { children, className, style } = this.props;
    return (
      <div
        className={className}
        style={style}
        onMouseDown={this.onTapStart}
        onTouchStart={this.onTapStart}
      >
        {children}
      </div>
    );
  }
}

BarWrapper.propTypes = propTypes;
BarWrapper.defaultProps = defaultProps;

export default BarWrapper;
