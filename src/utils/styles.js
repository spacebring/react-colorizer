
export const colorPickerGradient = {
  marginBottom: '10px',
  marginTop: '10px',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
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
  alignItems: 'center',
  borderRadius: '50%',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
};

export const colorPickerTarget = {
  border: 'solid 2px white',
  borderRadius: '50%',
  boxSizing: 'border-box',
  pointerEvents: 'none',
};
