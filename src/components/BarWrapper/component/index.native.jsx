import React from 'react';
import { View } from 'react-native';
import Handler from '../../Handler';
import getPosition from '../../../utils/position';

const propTypes = {
  children: React.PropTypes.any.isRequired,
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
    this.onTapStart = this.onTapStart.bind(this);
    this.onSetBarDom = this.onSetBarDom.bind(this);
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

  onSetBarDom(barDom) {
    this.barDom = barDom;
    this.setState(() => ({
      isDomInitialized: true,
    }));
  }

  renderHandler(height, position, onValueChanged) {
    const { dragging, isDomInitialized, width } = this.state;
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
    const { children, height, position, onValueChanged, ...props } = this.props;
    return (
      <View
        ref={this.onSetBarDom}
        onMouseDown={this.onTapStart}
        onTouchStart={this.onTapStart}
        {...props}
      >
        {children ? (
          children(this.renderHandler(height, position, onValueChanged))
        ) : (
          this.renderHandler(height, position, onValueChanged)
        )}
      </View>
    );
  }
}

BarWrapper.propTypes = propTypes;
BarWrapper.defaultProps = defaultProps;
