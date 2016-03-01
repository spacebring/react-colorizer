import * as React from 'react';
import { Color } from '../color';
import { ColorPickerCircleComponent } from './ColorPickerCircleComponent';

export class BrightnessPickerComponent extends React.Component {

	constructor(props) {
		super(props);

		this.onPositionChanged = this.onPositionChanged.bind(this);
	}

	onPositionChanged(position) {
		this.props.onPositionChanged(position);
	}

	render() {
		const
			style = {
				height: this.props.height + 'px',
				backgroundImage: 'linear-gradient(90deg, rgb(255, 255, 255) 0%, #' + this.props.color.toHex() + ' 50%, rgb(0, 0, 0) 100%)'
			};

		return (
			<div className="colorPickerGradient" style={style}>
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
	position: undefined
};
