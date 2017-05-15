import tinycolor from 'tinycolor2';

/* eslint-disable import/prefer-default-export */
export function getHSLObject(color) {
  return tinycolor(color).toHsl();
}
/* eslint-enable */
