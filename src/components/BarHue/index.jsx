import PropTypes from "prop-types";
import React from "react";
import HuePickerWrapper from "./component/HuePickerWrapper";

const propTypes = {
  height: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  onValueChangeEnd: PropTypes.func,
  onValueChangeStart: PropTypes.func
};

const defaultProps = {};

export default class BarHue extends React.PureComponent {
  render() {
    const {
      height,
      value,
      width,
      onValueChanged,
      onValueChangeEnd,
      onValueChangeStart
    } = this.props;
    return (
      <HuePickerWrapper
        height={height}
        position={value / 360}
        width={width}
        onValueChanged={pos => onValueChanged(pos * 360)}
        onValueChangeEnd={onValueChangeEnd}
        onValueChangeStart={onValueChangeStart}
      />
    );
  }
}

BarHue.propTypes = propTypes;
BarHue.defaultProps = defaultProps;
