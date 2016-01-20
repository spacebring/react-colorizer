import * as React from 'react';
import { Color } from "../color";
import { ColorFunc } from "../i-color-func";
import { BaseColorPickerComponent } from "./BaseColorPickerComponent";
import { BrightnessPickerComponent } from "./BrightnessPickerComponent";

interface IColorPickerComponentProps {
	height: number;
	defaultColor?: Color;
	onColorChanged: any;
}

export class ColorPickerComponent extends React.Component<IColorPickerComponentProps, any> {
	public color: Color;
	public variation: string;
	public height: number;
	private basePicker: BaseColorPickerComponent;
	private brightnessPicker: BrightnessPickerComponent;

	constructor(props: IColorPickerComponentProps, height: number, defaultColor?: Color) {
		super(props);

		var color = new Color(255, 0, 0);
		if (defaultColor) {
			color = defaultColor;
		}

		//this._controller = new ColorPickerController(height, color);

		this.height = height;
		this.color = color;
		this.basePicker = new BaseColorPickerComponent(height, color).onColorChanged((c) => this.brightnessPicker.setBase(c));
		this.brightnessPicker = new BrightnessPickerComponent(height, color).onColorChanged((c) => {
				this.color = c;
				if (this.props.onColorChanged) {
					this.props.onColorChanged(this.color);
				}
			});

	}

	render() {
		return (
			<div>
				<BaseColorPickerComponent height={this.props.height} />
				<BrightnessPickerComponent height={this.props.height} />
			</div>
		);
	}
}
