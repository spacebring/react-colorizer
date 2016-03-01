import * as React from 'react';
import { Color } from '../color';

export class ColorPickerCircleComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			dragging: false,
			parentWidth: 0,
			parentLeft: 0,
			position: props.position
		};

		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
	}

	onMouseDown(e) {
		var self = this;

		this.setState({
			dragging: true,
			parentWidth: e.target.parentElement.clientWidth,
			parentLeft: e.target.parentElement.getBoundingClientRect().left
		});

		window.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('mouseup', this.onMouseUp);
	};

	onMouseMove(e) {

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

	onMouseUp() {
		this.setState({
			dragging: false
		});
	};

	render() {
		const
			size = this.props.size,
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

ColorPickerCircleComponent.defaultProps = {
	size: undefined,
	position: undefined,
	top: undefined,
	onPositionChanged: undefined
};
