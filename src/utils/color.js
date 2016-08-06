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

export function fullScheme(mainColor, scheme) {
  const colors = tinycolor(mainColor)[scheme]();
  const result = [];
  Object.keys(colors).forEach(colorKey => {
    const color = colors[colorKey];
    result.push(color.toHex());
    result.push(color.lighten().toHex());
    result.push(color.brighten().toHex());
    result.push(color.darken().toHex());
    result.push(color.desaturate().toHex());
    result.push(color.saturate().toHex());
  });
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
