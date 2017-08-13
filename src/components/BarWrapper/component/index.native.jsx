import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Handler from '../../Handler';
import getPosition from '../../../utils/position';

const propTypes = {
  children: PropTypes.any.isRequired,
  height: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onValueChanged: PropTypes.func.isRequired,
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
    this.setState(() => ({
      dragging,
    }));
  }

  onTapStart(e) { }

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
    return (
      <Handler
        barDom={this.barDom}
        dragging={dragging}
        size={height}
        width={width}
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
