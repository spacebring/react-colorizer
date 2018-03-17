import styled from "styled-components";

export default styled.View`
  align-items: center;
  height: ${props => props.size};
  justify-content: center;
  left: ${props => Math.round(props.position * props.width) - props.size / 2};
  position: absolute;
  top: 0;
  width: ${props => props.size};
`;
