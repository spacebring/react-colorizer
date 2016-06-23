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

export function getColorByPosition(position) {
  const colors = [
    new Color(0, 169, 224),
    new Color(50, 52, 144),
    new Color(234, 22, 136),
    new Color(235, 46, 46),
    new Color(253, 233, 45),
    new Color(0, 158, 84),
    new Color(0, 158, 84),
  ];
  const index = position * 5;
  const index1 = Math.floor(index);
  const index2 = index1 + 1;
  const percent = index - index1;
  return {
    r: colors[index1].r + (colors[index2].r - colors[index1].r) * percent,
    g: colors[index1].g + (colors[index2].g - colors[index1].g) * percent,
    b: colors[index1].b + (colors[index2].b - colors[index1].b) * percent,
  };
}

export function getBrightnessFromRGB(color) {
  return (255 - (Math.sqrt(
    color.r * color.r * 0.241 +
    color.g * color.g * 0.691 +
    color.b * color.b * 0.068
  ))) / 255;
}
