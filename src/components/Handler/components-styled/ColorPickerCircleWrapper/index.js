import styled from "styled-components";

// NOTE: Set real width to make it work when component is scaled.
export default styled.div.attrs({
  style: props => ({
    height: props.size,
    transform: `translate3d(${Math.round(props.position * props.width) -
      props.size / 2}px, 0, 0)`,
    width: props.size
  })
})`
  align-items: center;
  border-radius: 50%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  left: 0;
  margin-left: 0;
  position: absolute;
  top: 0;
`;
