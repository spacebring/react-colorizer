import styled from "styled-components/native";

export default styled.View`
  height: ${props => props.styleHeight}px;
  margin-top: 10;
  opacity: ${props => (props.isDisabled ? "0.5" : "1")};
  overflow: hidden;
  position: relative;
  width: ${props => props.styleWidth}px;
`;
