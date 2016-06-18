export const colorPickerGradient = {
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  marginTop: '10px',
  marginBottom: '10px',
};

export const colorPickerHueGradient = {
  backgroundImage: `linear-gradient(
    90deg,
    rgb(0, 169, 224) 0%,
    rgb(50, 52, 144) 20%,
    rgb(234, 22, 136) 40%,
    rgb(235, 46, 46) 60%,
    rgb(253, 233, 45) 80%,
    rgb(0, 158, 84) 100%
  )`,
};

export const colorPickerCircle = {
  position: 'absolute',
  boxSizing: 'border-box',
  border: 'solid 2px white',
  borderRadius: '50%',
  verticalAlign: 'middle',
  cursor: 'w-resize',
};
