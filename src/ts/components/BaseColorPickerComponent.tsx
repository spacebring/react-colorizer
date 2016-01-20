import * as React from 'react';
import { Color } from "../color";
import { ColorFunc } from "../i-color-func";
import { ColorPickerCircleComponent } from "./ColorPickerCircleComponent";

interface IBaseColorPickerComponentProps {
	height: number;
	defaultColor?: Color;
}

export class BaseColorPickerComponent extends React.Component<IBaseColorPickerComponentProps, any> {
	public color: Color;
	public height: number;

	constructor(props: IBaseColorPickerComponentProps) {
		super(props);

		var color = new Color(255, 0, 0);
		if (defaultColor) {
			color = defaultColor;
		}
		this._controller = new BaseColorPickerController(height, color);

		this.height = height;
		this.color = color;
	}

	public onColorChanged(handler: ColorFunc) {
		this._controller.onColorChanged = handler;
		return this;
	}

	render() {
		var style = {
			height: this.props.height + 'px'
		};

		return (
			<div className="colorPickerGradient colorPickerHueGradient" style={style}>
				<ColorPickerCircleComponent size={this.props.height / 2} position={0.5} top={this.props.height / 4} />
			</div>
		);
	}
}
