import * as React from 'react';
import { Color } from "../color";
import { ColorFunc } from "../i-color-func";
import { BaseColorPickerComponent } from "./BaseColorPickerComponent";
import { BrightnessPickerComponent } from "./BrightnessPickerComponent";

interface IColorPickerComponentProps {
	height: number;
	defaultColor?: Color;
	onColorChangedCallback: any;
}

export class ColorPickerComponent extends React.Component<IColorPickerComponentProps, any> {

	state = {
		baseColor: this.props.defaultColor || new Color(255, 0, 0),
		color: this.props.defaultColor || new Color(255, 0, 0),
		brightnessPosition: 0.5
	};

	constructor(props: IColorPickerComponentProps) {
		super(props);

		this.setBrightnessPickerBase = this.setBrightnessPickerBase.bind(this);
		this.onBrightnessPickerColorChanged = this.onBrightnessPickerColorChanged.bind(this);
	}

	setBrightnessPickerBase(baseColor: Color) {
		var newMainColor: Color;

		newMainColor = this.getMainColor(this.state.brightnessPosition);

		this.setState({
			baseColor: baseColor,
			color: newMainColor
		});

		this.changeColor(newMainColor);
	}

	onBrightnessPickerColorChanged(position: number) {
		var newMainColor: Color = this.getMainColor(position);

		this.setState({
			brightnessPosition: position,
			color: newMainColor
		});

		this.changeColor(newMainColor);
	}

	getMainColor(position: number) {
		var baseColor: Color = this.state.baseColor,
			newMainColor: Color = new Color(0, 0, 0);

		if (position < 0.5) {
			newMainColor.r = 255 + (baseColor.r - 255) * (position * 2);
			newMainColor.g = 255 + (baseColor.g - 255) * (position * 2);
			newMainColor.b = 255 + (baseColor.b - 255) * (position * 2);
		} else {
			newMainColor.r = baseColor.r - baseColor.r * ((position - 0.5) * 2);
			newMainColor.g = baseColor.g - baseColor.g * ((position - 0.5) * 2);
			newMainColor.b = baseColor.b - baseColor.b * ((position - 0.5) * 2);
		}

		return newMainColor;
	}

	changeColor(color: Color) {
		this.props.onColorChangedCallback(this.state.color);
	}

	render() {
		return (
			<div>
				<BaseColorPickerComponent
					height={this.props.height}
					color={this.state.baseColor}
					onBaseColorChanged={this.setBrightnessPickerBase}
				/>
				<BrightnessPickerComponent
					height={this.props.height}
					color={this.state.baseColor}
					position={this.state.brightnessPosition}
					onPositionChanged={this.onBrightnessPickerColorChanged}
				/>
			</div>
		);
	}
}
