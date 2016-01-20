import * as React from 'react';
import { Color } from "../color";
import { NumberFunc } from "../i-number-func";
import { ColorFunc } from "../i-color-func";
import { ColorPickerCircleComponent } from "./ColorPickerCircleComponent";

interface IBrightnessPickerComponentProps {
	height: number,
	defaultColor?: Color
}

export class BrightnessPickerComponent extends React.Component<IBrightnessPickerComponentProps, any> {
	public base: Color;
	public color: Color;
	public height: number;
	public onColorChanged: ColorFunc;
	private circle: ColorPickerCircleComponent;

	constructor(props: IBrightnessPickerComponentProps) {
		super(props);

		this._controller = new BrightnessPickerController(height, color, color.clone());

		this.height = this.props.height;
		this.base = this.state.color;
		this.color = this.state.color.clone();
		this.circle = new ColorPickerCircleComponent(height / 2, 0.5, height / 4);
		this.circle.onPositionChanged((p) => this.onPositionChanged(p));
	}

	state = {
		color: this.props.defaultColor || new Color(255, 0, 0),
	};

	public getColor(): Color {
		return this.state.color;
	}

	public onColorChanged(handler: ColorFunc) {
		this._controller.onColorChanged = handler;
		return this;
	}

	public setBase(color: Color) {
		this.base = color;
		this.onPositionChanged(this.circle.getPosition());
	}

	private onPositionChanged(pos: number) {
		if (pos < 0.5) {
			this.color.r = 255 + (this.base.r - 255) * (pos * 2);
			this.color.g = 255 + (this.base.g - 255) * (pos * 2);
			this.color.b = 255 + (this.base.b - 255) * (pos * 2);
		}
		else {
			this.color.r = this.base.r - this.base.r * ((pos - 0.5) * 2);
			this.color.g = this.base.g - this.base.g * ((pos - 0.5) * 2);
			this.color.b = this.base.b - this.base.b * ((pos - 0.5) * 2);
		}
		if (this.onColorChanged) {
			this.onColorChanged(this.color);
		}
	}

	render() {
		var style = {
			height: this.props.height + 'px',
			backgroundImage: 'linear-gradient(90deg, rgb(255, 255, 255) 0%, #' + this.base.toHex() + ' 50%, rgb(0, 0, 0) 100%)'
		};

		return (
			<div className="colorPickerGradient" style={style}>
				<Circle />
			</div>
		);
	}
}
