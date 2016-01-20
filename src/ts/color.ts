export class Color {
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