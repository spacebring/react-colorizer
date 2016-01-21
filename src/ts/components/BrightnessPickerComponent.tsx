import * as React from 'react';
import { Color } from "../color";
import { NumberFunc } from "../i-number-func";
import { ColorFunc } from "../i-color-func";
import { ColorPickerCircleComponent } from "./ColorPickerCircleComponent";

interface IBrightnessPickerComponentProps {
	height: number;
	color: Color;
	onPositionChanged: any;
	position: number;
}

export class BrightnessPickerComponent extends React.Component<IBrightnessPickerComponentProps, any> {

	constructor(props: IBrightnessPickerComponentProps) {
		super(props);

		this.onPositionChanged = this.onPositionChanged.bind(this);
	}

	onPositionChanged(position: number) {
		this.props.onPositionChanged(position);
	}

	render() {
		var style = {
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
