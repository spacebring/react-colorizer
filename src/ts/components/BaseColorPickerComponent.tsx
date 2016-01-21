import * as React from 'react';
import { Color } from "../color";
import { ColorFunc } from "../i-color-func";
import { ColorPickerCircleComponent } from "./ColorPickerCircleComponent";

interface IBaseColorPickerComponentProps {
	height: number;
	color: Color;
	onBaseColorChanged: any;
}

export class BaseColorPickerComponent extends React.Component<IBaseColorPickerComponentProps, any> {

	constructor(props: IBaseColorPickerComponentProps) {
		super(props);

		this.onPositionChanged = this.onPositionChanged.bind(this);
	}

	onPositionChanged(position: number) {
		var index: number,
			index1: number,
			index2: number,
			percent: number,
			color: Color = new Color(0, 0, 0),
			colors = [
				new Color(0, 169, 224),
				new Color(50, 52, 144),
				new Color(234, 22, 136),
				new Color(235, 46, 46),
				new Color(253, 233, 45),
				new Color(0, 158, 84),
				new Color(0, 158, 84)
			];

		index = position * 5;
		index1 = Math.floor(index);
		index2 = index1 + 1;
		percent = index - index1;

		color.r = colors[index1].r + (colors[index2].r - colors[index1].r) * percent;
		color.g = colors[index1].g + (colors[index2].g - colors[index1].g) * percent;
		color.b = colors[index1].b + (colors[index2].b - colors[index1].b) * percent;

		this.props.onBaseColorChanged(color);
	}

	render() {
		var style = {
			height: this.props.height + 'px'
		};

		return (
			<div className="colorPickerGradient colorPickerHueGradient" style={style}>
				<ColorPickerCircleComponent
					size={this.props.height / 2}
					position={0.5}
					top={this.props.height / 4}
					onPositionChanged={this.onPositionChanged}
				/>
			</div>
		);
	}
}
