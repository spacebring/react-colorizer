import styled from "styled-components";

export default styled.div.attrs({
  style: props => ({
    height: props.size / 2,
    width: props.size / 2
  })
})`
  border: solid 2px white;
  border-radius: 50%;
  box-sizing: border-box;
  pointer-events: none;
`;
