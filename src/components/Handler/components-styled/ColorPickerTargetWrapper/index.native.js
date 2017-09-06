import styled from "styled-components/native";

export default styled.View`
  border-color: white;
  border-style: solid;
  border-width: 2;
  width: ${props => props.size / 2};
  height: ${props => props.size / 2};
  border-radius: ${props => props.size / 4};
`;
