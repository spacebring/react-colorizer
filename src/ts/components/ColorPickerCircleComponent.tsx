import * as React from 'react';
import { NumberFunc } from "../i-number-func";
import {Color} from "../color";

interface IColorPickerCircleComponentProps {
	size: number;
	position: number;
	top: number;
}

export class ColorPickerCircleComponent extends React.Component<IColorPickerCircleComponentProps, any> {
	private dragging: boolean;
	private parentWidth: number;
	private parentLeft: number;

	constructor(props: IColorPickerCircleComponentProps) {
		super(props);

		this.dragging = false;

		window.addEventListener('mousemove', (e) => this.onMouseMove(e));
		window.addEventListener('mouseup', () => this.onMouseUp());

		this.onMouseDown = this.onMouseDown.bind(this);
	}

	public getPosition = () => {
		return this.props.position;
	};

	public positionChanged = (handler: NumberFunc) => {

		// TODO: fix, this is from BaseColorPickerComponent
		var colors = [
			new Color(0, 169, 224),
			new Color(50, 52, 144),
			new Color(234, 22, 136),
			new Color(235, 46, 46),
			new Color(253, 233, 45),
			new Color(0, 158, 84),
			new Color(0, 158, 84)
		];
		var index = pos * 5;
		var index1 = Math.floor(index);
		var index2 = index1 + 1;
		var percent = index - index1;
		this.color.r = colors[index1].r + (colors[index2].r - colors[index1].r) * percent;
		this.color.g = colors[index1].g + (colors[index2].g - colors[index1].g) * percent;
		this.color.b = colors[index1].b + (colors[index2].b - colors[index1].b) * percent;

		if (this.onColorChanged) {
			this.onColorChanged(this.color);
		}
		// TODO: fix, this is from BaseColorPickerComponent

		return this;
	};

	onMouseUp = () => {
		this.dragging = false;
	};

	onMouseMove = (e: MouseEvent) => {
		if (this.dragging) {
			this.props.position = (e.pageX - this.parentLeft) / this.parentWidth;
			if (this.props.position > 1) {
				this.props.position = 1;
			}
			if (this.props.position < 0) {
				this.props.position = 0;
			}
			m.redraw();

			if (this.positionChanged) {
				this.positionChanged(this.props.position);
			}
		}
	};

	onMouseDown = (e: MouseEvent) => {
		var rect: any;

		this.dragging = true;
		this.parentWidth = e.srcElement.parentElement.clientWidth;
		rect = e.srcElement.parentElement.getBoundingClientRect();
		this.parentLeft = rect.left;
	};

	render() {
		var style = {
			height: this.props.size + 'px',
			width: this.props.size + 'px',
			top: this.props.top + 'px',
			marginLeft: this.props.size / 2 + 'px',
			left: this.props.position * 100 + '%'
		};

		return (
			<div className="colorPickerCircle" style={style} onMouseDown={this.onMouseDown}>
			</div>
		);
	}
}
