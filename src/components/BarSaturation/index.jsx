import PropTypes from "prop-types";
import React from "react";
import SaturationPickerWrapper from "./component/SaturationPickerWrapper";

const propTypes = {
  height: PropTypes.number.isRequired,
  hue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  onValueChangeEnd: PropTypes.func,
  onValueChangeStart: PropTypes.func
};

const defaultProps = {};

export default class BarSaturation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onValueChanged = this.onValueChanged.bind(this);
  }

  onValueChanged(pos) {
    const { onValueChanged } = this.props;
    onValueChanged(pos * 100);
  }

  render() {
    const {
      height,
      hue,
      value,
      width,
      onValueChangeEnd,
      onValueChangeStart
    } = this.props;
    return (
      <SaturationPickerWrapper
        height={height}
        hue={hue}
        position={value / 100}
        width={width}
        onValueChanged={this.onValueChanged}
        onValueChangeEnd={onValueChangeEnd}
        onValueChangeStart={onValueChangeStart}
      />
    );
  }
}

BarSaturation.propTypes = propTypes;
BarSaturation.defaultProps = defaultProps;
