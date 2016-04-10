import tinycolor from 'tinycolor2';

export class Color {

	constructor(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	numberToHex(num) {
		let res = Math.round(num).toString(16);
		if (res.length < 2) {
			res = `0${res}`;
		}
		return res;
	}

	toHex() {
		return this.numberToHex(this.r) + this.numberToHex(this.g) + this.numberToHex(this.b);
	}

	tinyColor() {
		return tinycolor(this.toHex());
	}

	fullScheme(scheme) {
		const colors = this.tinyColor()[scheme]();
		const result = [];

		for (const i in colors) {
			if (colors.hasOwnProperty(i)) {
				result.push(colors[i].toHex());
				result.push(colors[i].lighten().toHex());
				result.push(colors[i].brighten().toHex());
				result.push(colors[i].darken().toHex());
				result.push(colors[i].desaturate().toHex());
				result.push(colors[i].saturate().toHex());
			}
		}

		return result;
	}

	clone() {
		return new Color(this.r, this.g, this.b);
	}
}

export function fromHex(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	return result
		? new Color(
			parseInt(result[1], 16),
			parseInt(result[2], 16),
			parseInt(result[3], 16)
		)
		: null;
}
