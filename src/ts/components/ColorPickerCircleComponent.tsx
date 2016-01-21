import * as React from 'react';
import { NumberFunc } from "../i-number-func";
import {Color} from "../color";

interface IColorPickerCircleComponentProps {
	size: number;
	position: number;
	top: number;
	onPositionChanged: any;
}

export class ColorPickerCircleComponent extends React.Component<IColorPickerCircleComponentProps, any> {

	constructor(props: IColorPickerCircleComponentProps) {
		super(props);

		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
	}

	state = {
		dragging: false,
		parentWidth: 0,
		parentLeft: 0,
		position: this.props.position
	};

	onMouseDown = (e: any) => {
		var self = this;

		this.setState({
			dragging: true,
			parentWidth: e.target.parentElement.clientWidth,
			parentLeft: e.target.parentElement.getBoundingClientRect().left
		});

		window.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('mouseup', this.onMouseUp);
	};

	onMouseMove = (e: any) => {

		if (!this.state.dragging) {
			return;
		}

		this.setState({
			position: (e.pageX - this.state.parentLeft) / this.state.parentWidth
		});

		if (this.state.position > 1) {
			this.setState({
				position: 1
			});
		}
		if (this.state.position < 0) {
			this.setState({
				position: 0
			});
		}

		this.props.onPositionChanged(this.state.position);
	};

	onMouseUp = () => {
		this.setState({
			dragging: false
		});
	};

	render() {
		var size = this.props.size,
			style = {
				height: size + 'px',
				width: size + 'px',
				top: this.props.top + 'px',
				marginLeft: - size / 2 + 'px',
				left: this.state.position * 100 + '%'
			};

		return (
			<div
				className="colorPickerCircle"
				style={style} 
				onMouseDown={this.onMouseDown}
			>
			</div>
		);
	}
}
