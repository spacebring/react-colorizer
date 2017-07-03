import PropTypes from 'prop-types';
import React from 'react';
import HuePickerWrapper from './component/HuePickerWrapper';

const propTypes = {
  height: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onValueChanged: PropTypes.func.isRequired,
};

const defaultProps = {};

export default class HuePicker extends React.PureComponent {
  render() {
    const { height, value, width, onValueChanged } = this.props;
    return (
      <HuePickerWrapper
        height={height}
        position={value / 360}
        width={width}
        onValueChanged={pos => onValueChanged(pos * 360)}
      />
    );
  }
}

HuePicker.propTypes = propTypes;
HuePicker.defaultProps = defaultProps;
