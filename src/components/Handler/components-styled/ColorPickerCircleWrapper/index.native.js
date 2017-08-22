import styled from 'styled-components/native';

export default styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  height: ${props => (props.size)};
  width: ${props => (props.size)};
  left: ${props => Math.round(props.position * props.width) - (props.size / 2)}
`;
