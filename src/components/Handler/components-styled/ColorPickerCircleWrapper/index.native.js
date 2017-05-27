import styled from 'styled-components/native';

export default styled.View.attrs({
  style: props => ({
    height: props.size,
    width: props.size,
    top: props.top,
    left: Math.round(props.position * props.width) - (props.size / 2),
    borderRadius: props.size / 2,
  }),
})`
  align-items: center;
  justify-content: center;
  position: absolute;
  margin-left: 0;
`;
