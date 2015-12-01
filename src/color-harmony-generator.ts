/// <reference path="../mithril.d.ts" />
/// <reference path="../tinycolor.d.ts" />
module ColorPicker {

	class Color {
		public r: number;
		public g: number;
		public b: number;

		constructor(r: number, g: number, b: number) {
			this.r = r;
			this.g = g;
			this.b = b;
		}

		private numberToHex(num: number): string {
			var res = Math.round(num).toString(16);
			if (res.length < 2) {
				res = '0' + res;
			}
			return res;
		}

		toHex(): string {
			return this.numberToHex(this.r) + this.numberToHex(this.g) + this.numberToHex(this.b);
		}

		tinyColor(): tinycolorInstance {
			return tinycolor(this.toHex());
		}

		fullScheme(scheme: string): Array<string> {
			var colors: Array<tinycolorInstance> = this.tinyColor()[scheme]();
			var result: Array<string> = [];
			for (var i in colors) {
				result.push(colors[i].toHex());
				result.push(colors[i].lighten().toHex());
				result.push(colors[i].brighten().toHex());
				result.push(colors[i].darken().toHex());
				result.push(colors[i].desaturate().toHex());
				result.push(colors[i].saturate().toHex());
			}
			return result;
		}

		clone(): Color {
			return new Color(this.r, this.g, this.b)
		}

		static fromHex(hex: string): Color {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? new Color(
				parseInt(result[1], 16),
				parseInt(result[2], 16),
				parseInt(result[3], 16)
			) : null;
		}
	}

	interface NumberFunc {
		(num: number): void;
	}
	interface ColorFunc {
		(color: Color): void;
	}

	export class ColorPickerComponent {
		private _controller: ColorPickerController;

		constructor(height: number, defaultColor?: Color) {
			var color = new Color(255, 0, 0);
			if (defaultColor) {
				color = defaultColor;
			}
			this._controller = new ColorPickerController(height, color);
		}

		public getColor(): Color {
			return this._controller.color;
		}

		public getVariation(): string {
			return this._controller.variation;
		}

		public onColorChanged(handler: ColorFunc) {
			this._controller.onColorChanged = handler;
			return this;
		}

		controller = (): any => {
			return this._controller;
		};

		view = ColorPickerView
	}
	class ColorPickerController {
		public color: Color;
		public variation: string;
		public height: number;
		private basePicker: BaseColorPickerComponent;
		private brightnessPicker: BrightnessPickerComponent;
		public onColorChanged: ColorFunc;

		constructor(height: number, color: Color) {
			this.height = height;
			this.color = color;
			this.basePicker = new BaseColorPickerComponent(height, color)
				.onColorChanged((c) => this.brightnessPicker.setBase(c));
			this.brightnessPicker = new BrightnessPickerComponent(height, color)
				.onColorChanged((c) => {
					this.color = c;
					if (this.onColorChanged) {
						this.onColorChanged(this.color);
					}
				});
		}
	}
	function ColorPickerView(ctrl: any) {

		return m('div', [
			m.component(ctrl.basePicker),
			m.component(ctrl.brightnessPicker)
		]);
	}

	class ColorPickerCircleComponent {
		private _controller: ColorPickerCircleController;

		constructor(size: number, position: number, top: number) {
			this._controller = new ColorPickerCircleController(size, position, top);
		}

		public getPosition(): number {
			return this._controller.position;
		}

		public onPositionChanged(handler: NumberFunc) {
			this._controller.onPositionChanged = handler;
			return this;
		}

		controller = (): any => {
			return this._controller;
		};

		view = ColorPickerCircleView
	}
	class ColorPickerCircleController {
		public size: number;
		public top: number;
		public position: number;
		public onPositionChanged: NumberFunc;

		private dragging: boolean;
		private parentWidth: number;
		private parentLeft: number;

		constructor(size: number, position: number, top: number) {
			this.size = size;
			this.position = position;
			this.top = top;
			this.dragging = false;

			window.addEventListener('mousemove', (e) => this.onMouseMove(e));
			window.addEventListener('mouseup', () => this.onMouseUp());
		}

		onMouseDown(e: MouseEvent) {
			this.dragging = true;
			this.parentWidth = e.srcElement.parentElement.clientWidth;
			var rect = e.srcElement.parentElement.getBoundingClientRect();
			this.parentLeft = rect.left;
		}
		onMouseUp() {
			this.dragging = false;
		}
		onMouseMove(e: MouseEvent) {
			if (this.dragging) {
				this.position = (e.pageX - this.parentLeft) / this.parentWidth;
				if (this.position > 1) {
					this.position = 1;
				}
				if (this.position < 0) {
					this.position = 0;
				}
				m.redraw();
				if (this.onPositionChanged) {
					this.onPositionChanged(this.position);
				}
			}
		}
	}
	function ColorPickerCircleView(ctrl: any) {
		return m('div', {
			className: 'colorPickerCircle',
			style: 'height: ' + ctrl.size + 'px;' +
				'width: ' + ctrl.size + 'px;' +
				'top: ' + ctrl.top + 'px;' +
				'margin-left: -' + ctrl.size / 2 + 'px;' +
				'left: ' + ctrl.position * 100 + '%;',
			onmousedown: (e: MouseEvent) => ctrl.onMouseDown(e)
		});
	}

	class BaseColorPickerComponent {
		private _controller: BaseColorPickerController;

		constructor(height: number, defaultColor?: Color) {
			var color = new Color(255, 0, 0);
			if (defaultColor) {
				color = defaultColor;
			}
			this._controller = new BaseColorPickerController(height, color);
		}

		public getColor(): Color {
			return this._controller.color;
		}

		public onColorChanged(handler: ColorFunc) {
			this._controller.onColorChanged = handler;
			return this;
		}

		controller = (): any => {
			return this._controller;
		};

		view = BaseColorPickerView
	}
	class BaseColorPickerController {
		public color: Color;
		public height: number;
		public onColorChanged: ColorFunc;
		private circle: ColorPickerCircleComponent;

		constructor(height: number, color: Color) {
			this.height = height;
			this.color = color;
			this.circle = new ColorPickerCircleComponent(height / 2, 0.5, height / 4)
				.onPositionChanged((p) => this.onPositionChanged(p));
		}

		private onPositionChanged(pos: number) {
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
		}
	}
	function BaseColorPickerView(ctrl: any) {

		return m('div', {
			className: 'colorPickerGradient colorPickerHueGradient',
			style: 'height: ' + ctrl.height + 'px'
		}, [
				m.component(ctrl.circle)
			]);
	}

	class BrightnessPickerComponent {
		private _controller: BrightnessPickerController;

		constructor(height: number, defaultColor?: Color) {
			var color = new Color(255, 0, 0);
			if (defaultColor) {
				color = defaultColor;
			}
			this._controller = new BrightnessPickerController(height, color, color.clone());
		}

		public getColor(): Color {
			return this._controller.color;
		}

		public setBase(color: Color) {
			this._controller.setBase(color);
		}

		public onColorChanged(handler: ColorFunc) {
			this._controller.onColorChanged = handler;
			return this;
		}

		controller = (): any => {
			return this._controller;
		};

		view = BrightnessPickerView
	}
	class BrightnessPickerController {
		public base: Color;
		public color: Color;
		public height: number;
		public onColorChanged: ColorFunc;
		private circle: ColorPickerCircleComponent;

		constructor(height: number, base: Color, color: Color) {
			this.height = height;
			this.base = base;
			this.color = color;
			this.circle = new ColorPickerCircleComponent(height / 2, 0.5, height / 4);
			this.circle.onPositionChanged((p) => this.onPositionChanged(p));
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

		public gradient(): string {
			return 'background-image: linear-gradient(90deg, rgb(255, 255, 255) 0%, #' + this.base.toHex() + ' 50%, rgb(0, 0, 0) 100%)';
		}
	}
	function BrightnessPickerView(ctrl: any) {

		return m('div', {
			className: 'colorPickerGradient',
			style: 'height: ' + ctrl.height + 'px; ' + ctrl.gradient()
		}, [
				m.component(ctrl.circle)
		]);
	}
}
