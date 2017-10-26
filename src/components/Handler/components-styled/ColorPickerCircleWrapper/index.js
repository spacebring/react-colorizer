import styled from "styled-components";

// NOTE: set real width to make it work when component is scaled
export default styled.div.attrs({
  style: props => ({
    height: props.size,
    left: 0,
    top: 0,
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
  position: absolute;
  margin-left: 0;
`;
