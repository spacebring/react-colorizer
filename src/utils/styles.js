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
    hsl(0, 100%, 50%) 0%,
    hsl(60, 100%, 50%) 17%,
    hsl(120, 100%, 50%) 33%,
    hsl(180, 100%, 50%) 50%,
    hsl(240, 100%, 50%) 67%,
    hsl(300, 100%, 50%) 83%,
    hsl(360, 100%, 50%) 100%
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
