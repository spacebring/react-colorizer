import * as React from 'react';
import autobind from 'autobind-decorator';
import { ColorPickerCircleComponent } from './ColorPickerCircleComponent';
import { colorPickerGradient } from '../utils/styles';

export class BrightnessPickerComponent extends React.Component {

  @autobind
  onPositionChanged(position) {
    this.props.onPositionChanged(position);
  }

  render() {
    const style = Object.assign({}, colorPickerGradient, {
      height: `${this.props.height}px`,
      backgroundImage: `linear-gradient(
        90deg, rgb(255, 255, 255) 0%, #${this.props.color.toHex()} 50%, rgb(0, 0, 0) 100%
      )`,
    });

    return (
      <div style={style} >
        <ColorPickerCircleComponent
          size={this.props.height / 2}
          position={this.props.position}
          top={this.props.height / 4}
          onPositionChanged={this.onPositionChanged}
        />
      </div>
    );
  }
}

BrightnessPickerComponent.defaultProps = {
  height: undefined,
  color: undefined,
  onPositionChanged: undefined,
  position: undefined,
};

BrightnessPickerComponent.propTypes = {
  height: React.PropTypes.any.isRequired,
  color: React.PropTypes.any,
  onPositionChanged: React.PropTypes.any,
  position: React.PropTypes.any,
};
