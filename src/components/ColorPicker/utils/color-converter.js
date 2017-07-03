import parse from 'pure-color/parse';
import rgb2hsl from 'pure-color/convert/rgb2hsl';

/* eslint-disable import/prefer-default-export */
export function getHSLObject(color) {
  const rgb = parse(color);
  const hsl = rgb2hsl(rgb);
  return {
    h: hsl[0],
    s: hsl[1],
    l: hsl[2],
  };
}
/* eslint-enable */
