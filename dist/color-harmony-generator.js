/// <reference path="../mithril.d.ts" />
/// <reference path="../tinycolor.d.ts" />
var ColorPicker;
(function (ColorPicker) {
    var Color = (function () {
        function Color(r, g, b) {
            this.r = r;
            this.g = g;
            this.b = b;
        }
        Color.prototype.numberToHex = function (num) {
            var res = Math.round(num).toString(16);
            if (res.length < 2) {
                res = '0' + res;
            }
            return res;
        };
        Color.prototype.toHex = function () {
            return this.numberToHex(this.r) + this.numberToHex(this.g) + this.numberToHex(this.b);
        };
        Color.prototype.tinyColor = function () {
            return tinycolor(this.toHex());
        };
        Color.prototype.fullScheme = function (scheme) {
            var colors = this.tinyColor()[scheme]();
            var result = [];
            for (var i in colors) {
                result.push(colors[i].toHex());
                result.push(colors[i].lighten().toHex());
                result.push(colors[i].brighten().toHex());
                result.push(colors[i].darken().toHex());
                result.push(colors[i].desaturate().toHex());
                result.push(colors[i].saturate().toHex());
            }
            return result;
        };
        Color.prototype.clone = function () {
            return new Color(this.r, this.g, this.b);
        };
        Color.fromHex = function (hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) : null;
        };
        return Color;
    })();
    var ColorPickerComponent = (function () {
        function ColorPickerComponent(height, defaultColor) {
            var _this = this;
            this.controller = function () {
                return _this._controller;
            };
            this.view = ColorPickerView;
            var color = new Color(255, 0, 0);
            if (defaultColor) {
                color = defaultColor;
            }
            this._controller = new ColorPickerController(height, color);
        }
        ColorPickerComponent.prototype.getColor = function () {
            return this._controller.color;
        };
        ColorPickerComponent.prototype.getVariation = function () {
            return this._controller.variation;
        };
        ColorPickerComponent.prototype.onColorChanged = function (handler) {
            this._controller.onColorChanged = handler;
            return this;
        };
        return ColorPickerComponent;
    })();
    ColorPicker.ColorPickerComponent = ColorPickerComponent;
    var ColorPickerController = (function () {
        function ColorPickerController(height, color) {
            var _this = this;
            this.height = height;
            this.color = color;
            this.basePicker = new BaseColorPickerComponent(height, color)
                .onColorChanged(function (c) { return _this.brightnessPicker.setBase(c); });
            this.brightnessPicker = new BrightnessPickerComponent(height, color)
                .onColorChanged(function (c) {
                _this.color = c;
                if (_this.onColorChanged) {
                    _this.onColorChanged(_this.color);
                }
            });
        }
        return ColorPickerController;
    })();
    function ColorPickerView(ctrl) {
        return m('div', [
            m.component(ctrl.basePicker),
            m.component(ctrl.brightnessPicker)
        ]);
    }
    var ColorPickerCircleComponent = (function () {
        function ColorPickerCircleComponent(size, position, top) {
            var _this = this;
            this.controller = function () {
                return _this._controller;
            };
            this.view = ColorPickerCircleView;
            this._controller = new ColorPickerCircleController(size, position, top);
        }
        ColorPickerCircleComponent.prototype.getPosition = function () {
            return this._controller.position;
        };
        ColorPickerCircleComponent.prototype.onPositionChanged = function (handler) {
            this._controller.onPositionChanged = handler;
            return this;
        };
        return ColorPickerCircleComponent;
    })();
    var ColorPickerCircleController = (function () {
        function ColorPickerCircleController(size, position, top) {
            var _this = this;
            this.size = size;
            this.position = position;
            this.top = top;
            this.dragging = false;
            window.addEventListener('mousemove', function (e) { return _this.onMouseMove(e); });
            window.addEventListener('mouseup', function () { return _this.onMouseUp(); });
        }
        ColorPickerCircleController.prototype.onMouseDown = function (e) {
            this.dragging = true;
            this.parentWidth = e.srcElement.parentElement.clientWidth;
            var rect = e.srcElement.parentElement.getBoundingClientRect();
            this.parentLeft = rect.left;
        };
        ColorPickerCircleController.prototype.onMouseUp = function () {
            this.dragging = false;
        };
        ColorPickerCircleController.prototype.onMouseMove = function (e) {
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
        };
        return ColorPickerCircleController;
    })();
    function ColorPickerCircleView(ctrl) {
        return m('div', {
            className: 'colorPickerCircle',
            style: 'height: ' + ctrl.size + 'px;' +
                'width: ' + ctrl.size + 'px;' +
                'top: ' + ctrl.top + 'px;' +
                'margin-left: -' + ctrl.size / 2 + 'px;' +
                'left: ' + ctrl.position * 100 + '%;',
            onmousedown: function (e) { return ctrl.onMouseDown(e); }
        });
    }
    var BaseColorPickerComponent = (function () {
        function BaseColorPickerComponent(height, defaultColor) {
            var _this = this;
            this.controller = function () {
                return _this._controller;
            };
            this.view = BaseColorPickerView;
            var color = new Color(255, 0, 0);
            if (defaultColor) {
                color = defaultColor;
            }
            this._controller = new BaseColorPickerController(height, color);
        }
        BaseColorPickerComponent.prototype.getColor = function () {
            return this._controller.color;
        };
        BaseColorPickerComponent.prototype.onColorChanged = function (handler) {
            this._controller.onColorChanged = handler;
            return this;
        };
        return BaseColorPickerComponent;
    })();
    var BaseColorPickerController = (function () {
        function BaseColorPickerController(height, color) {
            var _this = this;
            this.height = height;
            this.color = color;
            this.circle = new ColorPickerCircleComponent(height / 2, 0.5, height / 4)
                .onPositionChanged(function (p) { return _this.onPositionChanged(p); });
        }
        BaseColorPickerController.prototype.onPositionChanged = function (pos) {
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
        };
        return BaseColorPickerController;
    })();
    function BaseColorPickerView(ctrl) {
        return m('div', {
            className: 'colorPickerGradient colorPickerHueGradient',
            style: 'height: ' + ctrl.height + 'px'
        }, [
            m.component(ctrl.circle)
        ]);
    }
    var BrightnessPickerComponent = (function () {
        function BrightnessPickerComponent(height, defaultColor) {
            var _this = this;
            this.controller = function () {
                return _this._controller;
            };
            this.view = BrightnessPickerView;
            var color = new Color(255, 0, 0);
            if (defaultColor) {
                color = defaultColor;
            }
            this._controller = new BrightnessPickerController(height, color, color.clone());
        }
        BrightnessPickerComponent.prototype.getColor = function () {
            return this._controller.color;
        };
        BrightnessPickerComponent.prototype.setBase = function (color) {
            this._controller.setBase(color);
        };
        BrightnessPickerComponent.prototype.onColorChanged = function (handler) {
            this._controller.onColorChanged = handler;
            return this;
        };
        return BrightnessPickerComponent;
    })();
    var BrightnessPickerController = (function () {
        function BrightnessPickerController(height, base, color) {
            var _this = this;
            this.height = height;
            this.base = base;
            this.color = color;
            this.circle = new ColorPickerCircleComponent(height / 2, 0.5, height / 4);
            this.circle.onPositionChanged(function (p) { return _this.onPositionChanged(p); });
        }
        BrightnessPickerController.prototype.setBase = function (color) {
            this.base = color;
            this.onPositionChanged(this.circle.getPosition());
        };
        BrightnessPickerController.prototype.onPositionChanged = function (pos) {
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
        };
        BrightnessPickerController.prototype.gradient = function () {
            return 'background-image: linear-gradient(90deg, rgb(255, 255, 255) 0%, #' + this.base.toHex() + ' 50%, rgb(0, 0, 0) 100%)';
        };
        return BrightnessPickerController;
    })();
    function BrightnessPickerView(ctrl) {
        return m('div', {
            className: 'colorPickerGradient',
            style: 'height: ' + ctrl.height + 'px; ' + ctrl.gradient()
        }, [
            m.component(ctrl.circle)
        ]);
    }
})(ColorPicker || (ColorPicker = {}));
//# sourceMappingURL=color-harmony-generator.js.map