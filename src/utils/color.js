import tinycolor from 'tinycolor2';

class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

function numberToHex(num) {
  let res = Math.round(num).toString(16);
  if (res.length < 2) {
    res = `0${res}`;
  }
  return res;
}

export function toHex(color) {
  return numberToHex(color.r) + numberToHex(color.g) + numberToHex(color.b);
}

export function fullScheme(color, scheme) {
  const colors = tinycolor(color)[scheme]();
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

const defaultSaturation = 1;

export function getColorByPosition(position) {
  const color = {
    h: position * 360,
    s: defaultSaturation,
    l: 0.5,
  };
  return tinycolor(color).toRgb();
}

export function getColorFromBaseAndBrightness(baseColor, brightness) {
  const baseHue = tinycolor(baseColor).toHsl().h;
  const color = {
    h: baseHue,
    s: defaultSaturation,
    l: brightness,
  };
  return tinycolor(color).toRgb();
}

export function getBasePositionFromRGB(color) {
  return tinycolor(color).toHsl().h / 360;
}

export function getBrightnessFromRGB(color) {
  return tinycolor(color).toHsl().l;
}
